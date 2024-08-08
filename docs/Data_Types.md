# Prisma Schema Data Models

enum PaymentInterval {
  monthly
}

enum SubscriptionStatus {
  active
  cancelled
  paused
}

model Payment {
  id             String       @id @default(uuid())
  amount         Float
  currency       String
  paymentDate    DateTime     @default(now())
  userSubscriptionId String   
  userSubscription UserSubscription @relation(fields: [userSubscriptionId], references: [id])
  stripePaymentId String?     // Stripe payment ID for tracking
  iapPaymentId    String?     // IAP payment ID for tracking
}

model Subscription {
  id                  String   @id @default(uuid())
  name                String
  freeTrialDuration   Int?
  price               Float?
  currency            String  @default("GBP")
  paymentInterval     PaymentInterval @default(monthly)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @default(now())
  userSubscriptions   UserSubscription[]
}

model UserSubscription {
  id             String        @id @default(uuid())
  subscription   Subscription  @relation(fields: [subscriptionId], references: [id])
  subscriptionId String        @unique
  user           User          @relation(fields: [userId], references: [id])
  userId         String        @unique
  status         SubscriptionStatus @default(active)
  trialStartDate DateTime?
  trialEndDate   DateTime?
  startDate      DateTime?
  endDate        DateTime?
  stripeSubscriptionId String? // Stripe subscription ID
  iapSubscriptionId    String? // IAP subscription ID
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @default(now())
  payments       Payment[]
}


model Auth {
  id                     String    @id @default(uuid())
  password               String?
  googleId               String?   @unique
  emailVerificationCode  String?
  emailVerificationExpiry DateTime?
  isEmailVerified        Boolean   @default(false)
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt
  userId                 String    @unique
  user                   User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Session {
  id         String   @id @default(uuid())
  token      String   @unique
  createdAt  DateTime @default(now())
  expiresAt  DateTime
  userId     String   @unique
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id                 String              @id @default(uuid())
  firstName          String?
  lastName           String?
  email              String              @unique
  profilePicture     String?
  location           String?
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @default(now())
  auth               Auth?
  session            Session?
  subscription       UserSubscription?   
  vehicles           VehicleOwnership[]  @relation("UserVehicles")
  documents          Document[]          @relation("UserDocuments")
}

model Vehicle {
  id                 String              @id @default(uuid())
  make               String
  model              String
  registrationNumber String              @unique
  details            VehicleDetails      @relation(fields: [registrationNumber], references: [registrationNumber])
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @default(now())
  ownershipHistory   VehicleOwnership[]  @relation("VehicleOwnerships")
  documents          Document[]          @relation("VehicleDocuments")
}

model VehicleOwnership {
  id             String   @id @default(uuid())
  userId         String
  vehicleId      String
  startDate      DateTime?
  endDate        DateTime?
  isCurrentOwner Boolean @default(true)
  isTemporaryOwner Boolean @default(false)
  canEditDocuments Boolean @default(true)
  user           User     @relation("UserVehicles", fields: [userId], references: [id])
  vehicle        Vehicle  @relation("VehicleOwnerships", fields: [vehicleId], references: [id])
}

model VehicleDetails {
  id                      String      @id @default(uuid())
  registrationNumber      String      @unique
  taxStatus               String
  taxDueDate              DateTime
  motStatus               String
  yearOfManufacture       Int
  engineCapacity          Int
  co2Emissions            Int
  fuelType                String
  markedForExport         Boolean
  colour                  String
  typeApproval            String
  euroStatus              String
  dateOfLastV5CIssued     DateTime
  motExpiryDate           DateTime
  wheelplan               String
  monthOfFirstRegistration DateTime
  vehicle                 Vehicle?
  createdAt               DateTime    @default(now())
  updatedAt               DateTime    @default(now())
}

model Document {
  id             String       @id @default(uuid())
  type           DocumentType
  displayDate    DateTime
  header         String
  description    String
  invoiceValue   Float
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @default(now())
  vehicle        Vehicle      @relation("VehicleDocuments", fields: [vehicleId], references: [id])
  vehicleId      String
  createdBy      User         @relation("UserDocuments", fields: [createdById], references: [id])
  createdById    String
  files          MediaFile[]
}

model MediaFile {
  id                String                    @id @default(uuid())
  type              MediaFileType
  url               String
  createdAt         DateTime                  @default(now())
  updatedAt         DateTime                  @default(now())
  document          Document?                 @relation(fields: [documentId], references: [id])
  documentId        String?
}

enum DocumentType {
  post
  invoice
  reminder
  document
}

enum MediaFileType {
  photo
  video
  document
}
