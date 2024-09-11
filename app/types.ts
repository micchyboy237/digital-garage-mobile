export enum PaymentInterval {
  monthly = "monthly",
}

export enum SubscriptionStatus {
  active = "active",
  cancelled = "cancelled",
  paused = "paused",
}

export enum EventType {
  post = "post",
  reminder = "reminder",
  invoice = "invoice",
  document = "document",
}

export enum DocumentType {
  general = "general",
  photo = "photo",
}

export enum MediaFileType {
  photo = "IMAGE",
  video = "VIDEO",
  document = "DOCUMENT",
}

export enum UserRole {
  admin = "admin",
  user = "user",
}

interface BaseEntity {
  id: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Payment extends BaseEntity {
  amount: number
  currency: string
  paymentDate: Date
  userSubscriptionId: string
  userSubscription: UserSubscription
  stripePaymentId?: string
  iapPaymentId?: string
}

export interface Subscription extends BaseEntity {
  name: string
  freeTrialDuration?: number
  price?: number
  currency: string
  paymentInterval: PaymentInterval
  userSubscriptions: UserSubscription[]
}

export interface UserSubscription extends BaseEntity {
  subscription: Subscription
  subscriptionId: string
  user: User
  userId: string
  status: SubscriptionStatus
  trialStartDate?: Date
  trialEndDate?: Date
  startDate?: Date
  endDate?: Date
  stripeSubscriptionId?: string
  iapSubscriptionId?: string
  payments: Payment[]
}

export interface Auth extends BaseEntity {
  password?: string
  googleId?: string
  appleId?: string
  emailVerificationCode?: string
  emailVerificationExpiry?: Date
  isEmailVerified?: boolean
  userId: string
  user?: User
  passwordResetToken?: string
  passwordResetExpiry?: Date
}

export interface Session extends BaseEntity {
  token: string
  expiresAt: Date
  userId: string
  user?: User
}

export interface User extends BaseEntity {
  role: UserRole
  firstName?: string
  lastName?: string
  email: string
  profilePicture?: MediaFile
  location?: string
  auth?: Auth
  session?: Session[]
  subscription?: UserSubscription
  vehicleOwnerships?: VehicleOwnership[]
  documents?: Document[]
  events?: VehicleEvent[]
  notificationSubs?: NotificationSubscription[]
  notifications?: Notification[]
}

export interface Vehicle extends BaseEntity {
  make: string
  model: string
  registrationNumber: string
  details: VehicleDetails
  ownershipHistory: VehicleOwnership[]
  documents: Document[]
  events: VehicleEvent[]
}

export interface VehicleOwnership extends BaseEntity {
  userId: string
  vehicleId: string
  description?: string
  displayPicture?: MediaFile
  startDate?: Date
  endDate?: Date
  isCurrentOwner: boolean
  isTemporaryOwner: boolean
  canEditDocuments: boolean
  user?: User
  vehicle?: Vehicle
  events: VehicleEvent[]
}

export interface VehicleDetails extends BaseEntity {
  registrationNumber: string
  make: string
  model?: string
  taxStatus: string
  taxDueDate: Date
  motStatus: string
  yearOfManufacture: number
  engineCapacity: number
  co2Emissions: number
  fuelType: string
  markedForExport: boolean
  colour: string
  typeApproval: string
  euroStatus: string
  dateOfLastV5CIssued: Date
  motExpiryDate: Date
  wheelplan: string
  monthOfFirstRegistration: Date
  vehicle?: Vehicle
}

export interface VehicleEvent extends BaseEntity {
  type: EventType
  header: string
  description?: string
  date: Date
  price?: number
  documents?: Document[]
  vehicleId?: string
  vehicle?: Vehicle
  createdById?: string
  createdBy?: User
}

export interface Document extends BaseEntity {
  type: DocumentType
  date: Date
  title?: string
  description?: string
  amount?: number
  createdBy?: User
  createdById: string
  files: MediaFile[]
  vehicle?: Vehicle
  vehicleId?: string
  vehicleEventId?: string
  vehicleEvent?: VehicleEvent
}

export interface MediaFile extends BaseEntity {
  type: MediaFileType
  mimeType: string
  url: string
  thumbnailUrl?: string
  description?: string
  document?: Document
  documentId?: string
  vehicleOwnershipId?: string
  vehicleOwnership?: VehicleOwnership
}

export interface NotificationSubscription extends BaseEntity {
  category: string
  user?: User
  userId?: string
}

export interface Notification extends BaseEntity {
  title: string
  message: string
  user: User
  userId: string
}
