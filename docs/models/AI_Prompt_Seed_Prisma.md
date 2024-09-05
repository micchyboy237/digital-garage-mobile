## Prompt 1
Given the below schema.prisma, write a seed file that will demonstrate user flows to populate all fields with the best real world samples

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
  vehicleDocuments  VehicleDocument[]
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

  @@unique([vehicleId, isDisplay], map: "unique_display_photo") // Ensures only one display photo per vehicle
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
  vehicle           Vehicle         @relation("vehicleTransfers", fields: [vehicleId], references: [id])
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

## ChatGPT 4o Response 1
To create a seed file for your Prisma schema, we can populate your database with realistic data that demonstrates user flows, such as user registration, vehicle ownership, subscription management, payments, and vehicle transfers. Below is a seed file written in TypeScript that you can use with Prisma's seed command. This script will create sample data, including users, profiles, sessions, subscriptions, payments, vehicles, and more.

### Seed File (`prisma/seed.ts`)

Ensure you have the Prisma Client installed (`@prisma/client`). Run `npx prisma generate` after defining your schema.

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      firebaseUid: 'firebase-uid-123',
      isEmailVerified: true,
      accountStatus: 'ACTIVE',
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          profilePicture: 'https://example.com/profile/johndoe.jpg',
          location: 'New York, USA',
        },
      },
      sessions: {
        create: [
          {
            token: 'session-token-1',
            expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            provider: 'EMAIL_PASSWORD',
            deviceFingerprint: 'device-fingerprint-1',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      firebaseUid: 'firebase-uid-456',
      isEmailVerified: false,
      accountStatus: 'SELECT_SUBSCRIPTION',
      profile: {
        create: {
          firstName: 'Jane',
          lastName: 'Smith',
          profilePicture: 'https://example.com/profile/janesmith.jpg',
          location: 'Los Angeles, USA',
        },
      },
    },
  });

  // Create Subscriptions
  const subscription1 = await prisma.subscription.create({
    data: {
      productId: 'sub-prod-123',
      plan: 'MONTH',
      status: 'ACTIVE',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      userId: user1.id,
      payments: {
        create: [
          {
            price: 29.99,
            currencyCode: 'USD',
            status: 'PAID',
            transactionId: 'txn-123',
            transactionDate: new Date(),
          },
        ],
      },
    },
  });

  // Create Vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      brand: 'Tesla',
      model: 'Model S',
      plateNumber: 'TES1234',
      userId: user1.id,
      photos: {
        create: [
          {
            thumbnailUrl: 'https://example.com/vehicle/tesla_thumb.jpg',
            imageUrl: 'https://example.com/vehicle/tesla.jpg',
            isDisplay: true,
          },
        ],
      },
      posts: {
        create: [
          {
            date: new Date(),
            title: 'My Tesla Model S',
            description: 'An amazing electric car!',
            photos: {
              create: [
                {
                  thumbnailUrl: 'https://example.com/posts/tesla_post_thumb.jpg',
                  imageUrl: 'https://example.com/posts/tesla_post.jpg',
                },
              ],
            },
            documents: {
              create: [
                {
                  fileUrl: 'https://example.com/posts/document.pdf',
                  mimeType: 'application/pdf',
                },
              ],
            },
          },
        ],
      },
      documents: {
        create: [
          {
            type: 'Registration',
            fileUrl: 'https://example.com/vehicle/registration.pdf',
            mimeType: 'application/pdf',
            createdById: user1.id,
          },
        ],
      },
    },
  });

  // Create Vehicle Transfer
  const transfer = await prisma.vehicleTransfer.create({
    data: {
      vehicleId: vehicle1.id,
      senderId: user1.id,
      recipientId: user2.id,
      status: 'PENDING',
    },
  });

  // Create Document Types and Fields
  const documentType = await prisma.documentType.create({
    data: {
      name: 'Insurance',
      fields: {
        create: [
          {
            label: 'Policy Number',
            fieldType: 'STRING',
          },
          {
            label: 'Coverage Amount',
            fieldType: 'NUMBER',
          },
          {
            label: 'Expiration Date',
            fieldType: 'DATE',
          },
        ],
      },
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Explanation

- **Users**: Creates two users with profiles, sessions, and different account statuses.
- **Subscriptions**: A subscription with payments is associated with `user1`.
- **Vehicles**: Adds a Tesla Model S with photos, posts, and documents.
- **Vehicle Transfer**: Demonstrates the process of transferring a vehicle between users.
- **Document Types and Fields**: Creates a document type (Insurance) with fields that could be used in vehicle documents.

### Running the Seed

Run the seed file using the following command:

```bash
npx prisma db seed
```

This script will populate your database with realistic data demonstrating typical user flows in your application, including user registration, vehicle ownership, and subscription management.