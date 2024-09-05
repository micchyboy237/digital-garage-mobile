## Prompt
Given the following schema, please add more to the existing list of real world user stories that is supported by this schema.

Current User Stories:

Authentication
- Can sign up for an account using my email and password, apple, or google.
- Can login to my account using my email and password, apple, or google with auto account creation if it doesn't exist for apple or google.
- Can request a password reset email if I forgot my password for email/password authentication.

Onboarding
- Can update my profile information.
- Can upload a profile picture.
- Can view my profile information.

Subscription
- Can subscribe to a subscription plan.
- Can view my subscription details.
- Can cancel my subscription.

Vehicle Management
- Can search for a vehicle by registration number with the option to add it to my account.
- Search results should prepopulate with vehicle details if available.
- Can view / edit vehicle details

Vehicle Posts
- Can create a post for a vehicle I own.
- Can view posts for a vehicle I own.
- Can delete a post for a vehicle I own.
- Can categorize a post as a gallery or history post.
- Can only add photos or videos to a gallery post.
- Can only add pdf documents to a history post.

Vehicle Transfer
- Can transfer ownership of a vehicle to another user.
- Can view vehicles that have been requested for transfer to me by another user.
- Can accept or reject a vehicle transfer request.
- Can filter out files of certain types from being transferred.

Vehicle Ownership
- Can only view current and past vehicles I have owned.
- New owners can set a display photo for the vehicle.
- New owners have their own vehicle details and posts.
- New owners can only update their own vehicle details and posts.

Vehicle Gallery
- All previous owner posts with category gallery are displayed in the gallery.
- New owners cannot update / delete previous owner posts.
- New owners can only update / delete their own created posts.
- New owners can only add / delete photos or videos to their own posts.

Vehicle History
- All previous owner posts with category history are displayed in the history.
- New owners cannot update / delete previous owner posts.
- New owners can only update / delete their own created posts.
- New owners can only add / delete pdf documents to their own posts.



```schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

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

enum TransferStatus {
  REQUESTED
  ACCEPTED
  REJECTED
}

enum FieldType {
  STRING
  NUMBER
  DATE
  BOOLEAN
}

enum PostCategory {
  GALLERY
  HISTORY
}

enum PostType {
  REMINDER
  INVOICE
  DOCUMENT
}

enum MediaFileType {
  IMAGE
  VIDEO
  DOCUMENT
}

model User {
  id                String                @id @default(uuid())
  email             String                @unique
  firebaseUid       String                @unique
  isEmailVerified   Boolean               @default(false)
  firstName         String?
  lastName          String?
  displayPicture    String?
  location          String?
  accountStatus     AccountStatus         @default(ONBOARDING)
  sessions          Session[]
  vehicles          Vehicle[]
  posts             VehiclePost[]
  transfersReceived VehicleTransfer[]     @relation("receivedTransfers")
  transfersSent     VehicleTransfer[]     @relation("sentTransfers")
  subscription      Subscription?
  vehicleOwnerships VehicleOwnership[]    // Updated relation field
  accounts          Account[]             // New relation to the Account model

  createdAt         DateTime              @default(now())
  updatedAt         DateTime              @updatedAt
}

model Account {
  id              String        @id @default(uuid())
  provider        AuthProvider
  lastLogin       DateTime?
  userId          String
  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  email           String
  sessions        Session[]

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@unique([provider, userId])
}

model Session {
  id                String        @id @default(uuid())
  token             String        @unique
  expiresAt         DateTime
  accountId         String
  account           Account       @relation(fields: [accountId], references: [id], onDelete: Cascade)
  deviceFingerprint String        @unique
  userId            String
  user              User?         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([deviceFingerprint, userId])

  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

model Subscription {
  id            String              @id @default(uuid())
  productId     String
  plan          SubscriptionPlan?
  status        SubscriptionStatus  @default(ACTIVE)
  startDate     DateTime?
  endDate       DateTime?
  expiresAt     DateTime?
  userId        String              @unique
  user          User?               @relation(fields: [userId], references: [id], onDelete: Cascade)
  payments      Payment[]

  createdAt     DateTime            @default(now())
  updatedAt     DateTime            @updatedAt
}

model Payment {
  id              String        @id @default(uuid())
  price           Float
  currencyCode    String
  status          PaymentStatus
  transactionId   String
  transactionDate DateTime
  subscriptionId  String
  subscription    Subscription? @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model MediaFile {
  id                    String              @id @default(uuid())
  type                  MediaFileType
  mimeType              String
  fileName              String
  url                   String
  thumbnailUrl          String
  postId                String?
  post                  VehiclePost?        @relation(name: "GalleryOrHistoryFiles", fields: [postId], references: [id], onDelete: Cascade)
  displayPhotoOwnership VehicleOwnership?   @relation(name: "DisplayPhoto") // Updated relation
  ownershipId           String?
  ownership             VehicleOwnership?   @relation(name: "OwnershipGalleryOrHistoryFiles", fields: [ownershipId], references: [id]) // Updated relation

  createdAt             DateTime            @default(now())
  updatedAt             DateTime            @updatedAt
}

model VehicleOwnership {  // Updated model name
  id                String            @id @default(uuid())
  userId            String
  vehicleId         String
  isCurrentOwner    Boolean           @default(true)
  vehicleDisplayPhotoId String?       @unique
  vehicleDisplayPhoto    MediaFile?   @relation("DisplayPhoto", fields: [vehicleDisplayPhotoId], references: [id])
  startDate         DateTime          @default(now())
  endDate           DateTime?
  user              User?             @relation(fields: [userId], references: [id])
  vehicle           Vehicle?          @relation(fields: [vehicleId], references: [id])
  posts             VehiclePost[]
  vehicleFiles      MediaFile[]       @relation("OwnershipGalleryOrHistoryFiles")
  vehicleDetails    VehicleDetails?

  @@unique([userId, vehicleId])

  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
}

model Vehicle {
  id                 String              @id @default(uuid())
  make               String
  model              String
  registrationNumber String              @unique
  ownerId            String              @unique
  owner              User?               @relation(fields: [ownerId], references: [id])
  ownerships         VehicleOwnership[]  // Updated relation field
  transfers          VehicleTransfer[]

  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
}

model VehicleDetails {
  id                       String              @id @default(uuid())
  fromApi                  Boolean             @default(true)
  registrationNumber       String              // Removed `@unique` constraint to allow multiple entries
  make                     String
  model                    String
  colour                   String
  yearOfManufacture        Int
  taxStatus                String
  taxDueDate               DateTime
  motStatus                String
  motExpiryDate            DateTime?
  engineCapacity           Int?
  co2Emissions             Int?
  fuelType                 String?
  markedForExport          Boolean?
  typeApproval             String?
  wheelplan                String?
  artEndDate               DateTime?
  monthOfFirstRegistration DateTime?
  euroStatus               String?
  dateOfLastV5CIssued      DateTime?
  realDrivingEmissions     String?
  revenueWeight            Int?

  ownershipId              String             @unique
  ownership                VehicleOwnership?  @relation(fields: [ownershipId], references: [id]) // Updated relation

  createdAt                DateTime           @default(now())
  updatedAt                DateTime           @updatedAt
}

model VehicleTransfer {
  id            String          @id @default(uuid())
  vehicleId     String
  vehicle       Vehicle?        @relation(fields: [vehicleId], references: [id])
  senderId      String
  sender        User?           @relation("sentTransfers", fields: [senderId], references: [id])
  recipientId   String
  recipient     User?           @relation("receivedTransfers", fields: [recipientId], references: [id])
  status        TransferStatus  @default(REQUESTED)
  transferDate  DateTime        @default(now())
  responseDate  DateTime?
  reason        String?         // Reason for transfer
  excludedMediaFileTypes MediaFileType[]

  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model VehiclePost {
  id           String              @id @default(uuid())
  title        String
  category     PostCategory        @default(GALLERY)
  description  String?
  type         PostType?
  files        MediaFile[]         @relation("GalleryOrHistoryFiles")
  createdById  String
  createdBy    User?               @relation(fields: [createdById], references: [id])
  ownershipId  String
  ownership    VehicleOwnership?   @relation(fields: [ownershipId], references: [id], onDelete: Cascade) // Updated relation

  createdAt    DateTime            @default(now())
  updatedAt    DateTime            @updatedAt
}

```

## Response
Here are some additional user stories that are supported by the schema provided:

### Authentication

- **As a user, I can** update my password after logging in.
- **As a user, I can** receive an email notification when my account password is changed.

### Onboarding

- **As a user, I can** complete the onboarding process by selecting a subscription plan to access the application features.
- **As a user, I can** choose to skip adding profile information during onboarding and add it later.

### Subscription Management

- **As a user, I can** upgrade or downgrade my subscription plan.
- **As a user, I can** view the history of my subscription changes.
- **As a user, I can** receive an email notification when my subscription is about to expire.
- **As a user, I can** manage my payment methods for subscription renewal.

### Payment Management

- **As a user, I can** view the payment history for my subscription.
- **As a user, I can** request a refund for a subscription payment.
- **As a user, I can** add a new payment method for my subscription.
- **As a user, I can** receive a receipt for my subscription payments via email.

### Vehicle Management

- **As a user, I can** request verification for the details of a vehicle.
- **As a user, I can** add custom notes or tags to my vehicles for personal reference.
- **As a user, I can** link a vehicle to its documents, such as registration and insurance papers.

### Vehicle Details Management

- **As a user, I can** update specific details of a vehicle, such as MOT status or tax status, if I am the current owner.
- **As a user, I can** upload documents related to the vehicle's maintenance history.

### Vehicle Transfer

- **As a user, I can** provide a reason when requesting a vehicle transfer.
- **As a user, I can** track the status of my vehicle transfer requests.

### Vehicle Ownership

- **As a user, I can** view the ownership history of my vehicle.
- **As a user, I can** share ownership information with potential buyers.

### Vehicle Gallery

- **As a user, I can** organize photos and videos in the vehicle gallery by date or type.
- **As a user, I can** add comments or captions to photos and videos in the gallery.
- **As a user, I can** download photos and videos from the gallery to my device.

### Vehicle History

- **As a user, I can** upload and categorize service invoices or repair records as part of the vehicle history.
- **As a user, I can** generate a report of the vehicle's history records.

### Notifications

- **As a user, I can** receive notifications when a new post is added to a vehicle I own.
- **As a user, I can** configure notification settings to receive alerts about vehicle transfers, subscription changes, or new posts.

### Post Management

- **As a user, I can** update the title and description of my posts.
- **As a user, I can** categorize posts under custom labels for better organization.

### Media Management

- **As a user, I can** view a list of all media files (images, videos, documents) related to my vehicles.
- **As a user, I can** preview images, videos, or documents before downloading them.

These additional user stories further leverage the relationships and functionalities supported by the schema, providing more comprehensive user experiences for managing vehicles, subscriptions, payments, and media within the application.