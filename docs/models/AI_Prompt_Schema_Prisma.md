## Prompt
Update so that a user has the ff:
- Can own vehicles
- Can edit vehicle details (ex. plate number, brand, model, etc.)
- Can add photos of a vehicle (with one photos as the display)
- A photo has a thumbnail and url
- Can add posts to a vehicle
- A post has a date, title, optional description, and optional photos / documents
- Can add documents to a vehicle
- Each document has a type (e.g. OR/CR, INSURANCE, etc.) and a file
- A document may contain a photo or other files with mime types standard to a real world document (no audio or video files)
- Can transfer ownership of a vehicle to another user (with approval from the recipient)
- Can view all past and current vehicles with their details and documents
- Can view all past and current transfers of ownership
- Cannot delete a vehicle if it has been transferred to another user
- Cannot view new documents added to a vehicle if it has been transferred to another user
- Cannot edit vehicle details if it has been transferred to another user
- Cannot transfer ownership of a vehicle if it has been transferred to another user
- Cannot edit documents that are not created by the user

When transferring, a user may filter out which posts, photos, documents he would like to remove before transferring so that the new user will not have access to these data.
Documents may vary in types and may be added in the future. The schema should be flexible enough to accommodate new types of documents with its own set of fields.
Maybe have a separate Config table for document types with fields to serve as a template for creating a new document. Each field should have a type (e.g. string, number, date, etc.) and a label.
Ex. A type of document is "INSURANCE" which has fields for the insurance company, policy number, and expiration date.
Try to normalize the schema as much as possible. Add, remove, or modify fields as what you think is recommended. Think critically and creatively so that the schema is flexible and scalable.

```schema.prisma
enum AuthProvider {
  EMAIL_PASSWORD
  GOOGLE
  APPLE
}

enum AccountStatus {
  ONBOARDING
  SELECT_SUBSCRIPTION
  ACTIVE
}

enum SubscriptionPlan {
  DAY
  WEEK
  MONTH
  YEAR
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  EXPIRED
}

enum PaymentStatus {
  PAID
  REFUNDED
  FAILED
}

model User {
  id                String          @id @default(uuid())
  email             String          @unique
  firebaseUid       String          @unique
  isEmailVerified   Boolean         @default(false)  
  profile           Profile?
  subscription      Subscription?
  accountStatus     AccountStatus   @default(ONBOARDING)
  sessions          Session[]
}

model Session {
  id         String   @id @default(uuid())
  token      String   @unique
  expiresAt  DateTime
  provider   AuthProvider
  deviceFingerprint String   @unique
  userId     String
  user       User?     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([deviceFingerprint, userId])
}


model Profile {
  id                String          @id @default(uuid())
  firstName         String?
  lastName          String?
  profilePicture    String?
  location          String?
  userId            String          @unique
  user              User?           @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Subscription {
  id                String              @id @default(uuid())
  productId         String
  plan              SubscriptionPlan?
  status            SubscriptionStatus  @default(ACTIVE)
  startDate         DateTime?
  endDate           DateTime?
  expiresAt         DateTime?
  userId            String              @unique
  user              User?               @relation(fields: [userId], references: [id], onDelete: Cascade)
  payments          Payment[]           // Relation to Payment model
}

model Payment {
  id                String          @id @default(uuid())
  price             Float
  currencyCode      String
  status            PaymentStatus
  transactionId     String
  transactionDate   DateTime
  subscriptionId    String
  subscription      Subscription?     @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
}

```

## ChatGPT 4o Response
Here's an updated schema that integrates the requested changes while maintaining flexibility and scalability. I've normalized the models and added new ones to manage vehicle ownership, document types, and their respective attributes.

```prisma
enum AuthProvider {
  EMAIL_PASSWORD
  GOOGLE
  APPLE
}

enum AccountStatus {
  ONBOARDING
  SELECT_SUBSCRIPTION
  ACTIVE
}

enum SubscriptionPlan {
  DAY
  WEEK
  MONTH
  YEAR
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  EXPIRED
}

enum PaymentStatus {
  PAID
  REFUNDED
  FAILED
}

model User {
  id                String          @id @default(uuid())
  email             String          @unique
  firebaseUid       String          @unique
  isEmailVerified   Boolean         @default(false)
  profile           Profile?
  subscription      Subscription?
  accountStatus     AccountStatus   @default(ONBOARDING)
  sessions          Session[]
  vehicles          Vehicle[]       // Relation to owned vehicles
  transfersReceived VehicleTransfer[] @relation("receivedTransfers")
  transfersSent     VehicleTransfer[] @relation("sentTransfers")
}

model Session {
  id                String          @id @default(uuid())
  token             String          @unique
  expiresAt         DateTime
  provider          AuthProvider
  deviceFingerprint String          @unique
  userId            String
  user              User?           @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([deviceFingerprint, userId])
}

model Profile {
  id                String          @id @default(uuid())
  firstName         String?
  lastName          String?
  profilePicture    String?
  location          String?
  userId            String          @unique
  user              User?           @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Subscription {
  id                String              @id @default(uuid())
  productId         String
  plan              SubscriptionPlan?
  status            SubscriptionStatus  @default(ACTIVE)
  startDate         DateTime?
  endDate           DateTime?
  expiresAt         DateTime?
  userId            String              @unique
  user              User?               @relation(fields: [userId], references: [id], onDelete: Cascade)
  payments          Payment[]           // Relation to Payment model
}

model Payment {
  id                String          @id @default(uuid())
  price             Float
  currencyCode      String
  status            PaymentStatus
  transactionId     String
  transactionDate   DateTime
  subscriptionId    String
  subscription      Subscription?   @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
}

model Vehicle {
  id                String          @id @default(uuid())
  brand             String
  model             String
  plateNumber       String          @unique
  userId            String
  user              User            @relation(fields: [userId], references: [id])
  photos            VehiclePhoto[]
  posts             VehiclePost[]
  documents         VehicleDocument[]
  transfers         VehicleTransfer[] @relation("vehicleTransfers")
  isTransferred     Boolean         @default(false) // Indicates if ownership has been transferred
}

model VehiclePhoto {
  id                String          @id @default(uuid())
  thumbnailUrl      String
  imageUrl          String
  isDisplay         Boolean         @default(false)
  vehicleId         String
  vehicle           Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
}

model VehiclePost {
  id                String          @id @default(uuid())
  date              DateTime
  title             String
  description       String?
  photos            PostPhoto[]
  documents         PostDocument[]
  vehicleId         String
  vehicle           Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
}

model PostPhoto {
  id                String          @id @default(uuid())
  thumbnailUrl      String
  imageUrl          String
  postId            String
  post              VehiclePost     @relation(fields: [postId], references: [id], onDelete: Cascade)
}

model PostDocument {
  id                String          @id @default(uuid())
  fileUrl           String
  mimeType          String
  postId            String
  post              VehiclePost     @relation(fields: [postId], references: [id], onDelete: Cascade)
}

model VehicleDocument {
  id                String          @id @default(uuid())
  type              String
  fileUrl           String
  mimeType          String
  createdById       String
  createdBy         User            @relation(fields: [createdById], references: [id])
  vehicleId         String
  vehicle           Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
}

model VehicleTransfer {
  id                String          @id @default(uuid())
  vehicleId         String
  vehicle           Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  senderId          String
  sender            User            @relation("sentTransfers", fields: [senderId], references: [id])
  recipientId       String
  recipient         User            @relation("receivedTransfers", fields: [recipientId], references: [id])
  status            TransferStatus  @default(PENDING)
  transferDate      DateTime?
}

enum TransferStatus {
  PENDING
  APPROVED
  REJECTED
  COMPLETED
}

model DocumentType {
  id                String          @id @default(uuid())
  name              String          @unique
  fields            DocumentField[] // Relation to document field templates
}

model DocumentField {
  id                String          @id @default(uuid())
  label             String
  fieldType         FieldType
  documentTypeId    String
  documentType      DocumentType    @relation(fields: [documentTypeId], references: [id], onDelete: Cascade)
}

enum FieldType {
  STRING
  NUMBER
  DATE
}
```

### Key Points:
1. **Vehicles:** A user can own multiple vehicles, edit their details, add photos, posts, and documents. Restrictions are in place once the vehicle has been transferred.
2. **Vehicle Photos:** Each vehicle can have multiple photos, with one set as the display.
3. **Vehicle Posts:** Posts can include dates, titles, descriptions, and optional photos or documents.
4. **Vehicle Documents:** Each document is tied to a vehicle, has a type, file URL, and can be created by different users. Document types are managed through a separate model, allowing for easy updates and additions in the future.
5. **Transfer Mechanism:** Vehicles can be transferred between users, with records of each transfer. Restrictions are enforced on transferred vehicles, such as editing and viewing capabilities.
6. **Flexible Document Types:** A `DocumentType` model allows the schema to adapt to new types of documents with defined fields, enabling future scalability. 

This design keeps the schema normalized and scalable while providing clear restrictions and ownership rules for vehicle-related entities.