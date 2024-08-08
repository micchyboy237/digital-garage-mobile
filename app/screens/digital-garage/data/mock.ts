import { mockAssets } from "app/screens/digital-garage/data/mock-assets"
import {
  Document,
  DocumentType,
  EventType,
  MediaFile,
  MediaFileType,
  Notification,
  NotificationSubscription,
  Payment,
  PaymentInterval,
  Session,
  Subscription,
  SubscriptionStatus,
  User,
  UserRole,
  UserSubscription,
  Vehicle,
  VehicleDetails,
  VehicleEvent,
  VehicleOwnership,
} from "../../../types"

const mockUser: User = {
  id: "user-1",
  role: UserRole.user,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  profilePicture: mockAssets.USER1_PROFILE_PIC,
  location: "New York, USA",
  createdAt: new Date(),
  updatedAt: new Date(),
  auth: {
    id: "auth-1",
    password: "hashedpassword",
    googleId: "google-123",
    emailVerificationCode: "123456",
    emailVerificationExpiry: new Date(Date.now() + 3600 * 1000),
    isEmailVerified: true,
    userId: "user-1",
    user: {} as User, // Circular reference, will be assigned later
    passwordResetToken: "reset-token",
    passwordResetExpiry: new Date(Date.now() + 3600 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  session: [],
  subscription: {} as UserSubscription, // Circular reference, will be assigned later
  vehicleOwnerships: [],
  documents: [],
  events: [], // Will be populated with mock events
  notificationSubs: [],
  notifications: [],
}

// Add a new user for vehicle transfer
const mock2ndUser: User = {
  id: "user-2",
  role: UserRole.user,
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  profilePicture: mockAssets.USER2_PROFILE_PIC,
  location: "Los Angeles, USA",
  createdAt: new Date(),
  updatedAt: new Date(),
  auth: {
    id: "auth-2",
    password: "hashedpassword2",
    googleId: "google-456",
    emailVerificationCode: "654321",
    emailVerificationExpiry: new Date(Date.now() + 3600 * 1000),
    isEmailVerified: true,
    userId: "user-2",
    user: {} as User, // Circular reference, will be assigned later
    passwordResetToken: "reset-token-2",
    passwordResetExpiry: new Date(Date.now() + 3600 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  session: [],
  subscription: {} as UserSubscription, // Circular reference, will be assigned later
  vehicleOwnerships: [],
  documents: [],
  events: [],
  notificationSubs: [],
  notifications: [],
}

const mockVehicle: Vehicle = {
  id: "vehicle-1",
  make: "Toyota",
  model: "Camry",
  registrationNumber: "ABC123",
  details: {
    id: "details-1",
    registrationNumber: "ABC123",
    taxStatus: "Valid",
    taxDueDate: new Date(),
    motStatus: "Valid",
    yearOfManufacture: 2020,
    engineCapacity: 2000,
    co2Emissions: 150,
    fuelType: "Petrol",
    markedForExport: false,
    colour: "Blue",
    typeApproval: "Approved",
    euroStatus: "Euro 6",
    dateOfLastV5CIssued: new Date(),
    motExpiryDate: new Date(),
    wheelplan: "2 Axle Rigid Body",
    monthOfFirstRegistration: new Date(),
    vehicle: {} as Vehicle, // Circular reference, will be assigned later
  },
  ownershipHistory: [],
  documents: [],
  events: [], // Will be populated with mock events
}

const mockPhoto1: MediaFile = {
  id: "photo-1",
  type: MediaFileType.photo,
  url: mockAssets.VEHICLE1_GALLERY_PIC,
  documentId: "document-1",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockPhoto2: MediaFile = {
  id: "photo-2",
  type: MediaFileType.photo,
  url: mockAssets.VEHICLE1_GALLERY_PIC,
  documentId: "document-1",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockEventPhoto1: Document = {
  id: "event-photo-1",
  type: DocumentType.photo,
  date: new Date(),
  vehicle: mockVehicle,
  vehicleId: "vehicle-1",
  createdBy: mockUser,
  createdById: "user-1",
  files: [mockPhoto1, mockPhoto2],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockInvoiceDocument: Document = {
  id: "document-1",
  type: DocumentType.invoice,
  date: new Date(),
  title: "Invoice from Volvo Main Dealer",
  vehicle: mockVehicle,
  vehicleId: "vehicle-1",
  createdBy: mockUser,
  createdById: "user-1",
  files: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockProofOfOwnershipDocument: Document = {
  id: "document-2",
  type: DocumentType.receipt,
  date: new Date(),
  title: "Proof of Ownership from DVLA",
  vehicle: mockVehicle,
  vehicleId: "vehicle-1",
  createdBy: mockUser,
  createdById: "user-1",
  files: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

// Define mock events for each EventType
const mockVehicleEvents: VehicleEvent[] = [
  {
    id: "event-1",
    type: EventType.post,
    header: "National Car Rally",
    description: "Great event, took a bit of time to get there but took some great pictures.",
    date: new Date("2024-06-27"),
    vehicleId: "vehicle-1",
    vehicle: mockVehicle,
    createdById: "user-1",
    createdBy: mockUser,
    documents: [mockEventPhoto1],
  },
  {
    id: "event-2",
    type: EventType.reminder,
    header: "MOT Due",
    date: new Date("2024-06-19"),
    vehicleId: "vehicle-1",
    vehicle: mockVehicle,
    createdById: "user-1",
    createdBy: mockUser,
  },
  {
    id: "event-3",
    type: EventType.invoice,
    header: "Volvo Main Dealer",
    description: "Replacement timing chain cover",
    date: new Date("2024-06-02"),
    price: 9.99,
    documents: [mockInvoiceDocument],
    vehicleId: "vehicle-1",
    vehicle: mockVehicle,
    createdById: "user-1",
    createdBy: mockUser,
  },
  {
    id: "event-4",
    type: EventType.document,
    header: "V5 Proof of Ownership",
    description: "Replacement received from DVLA.",
    date: new Date("2024-08-02"),
    documents: [mockProofOfOwnershipDocument],
    vehicleId: "vehicle-1",
    vehicle: mockVehicle,
    createdById: "user-1",
    createdBy: mockUser,
  },
]

const mockSubscription: Subscription = {
  id: "sub-1",
  name: "Premium Plan",
  freeTrialDuration: 30,
  price: 9.99,
  currency: "GBP",
  paymentInterval: PaymentInterval.monthly,
  userSubscriptions: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockUserSubscription: UserSubscription = {
  id: "user-sub-1",
  subscription: mockSubscription,
  subscriptionId: "sub-1",
  user: mockUser,
  userId: "user-1",
  status: SubscriptionStatus.active,
  trialStartDate: new Date(),
  trialEndDate: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  startDate: new Date(),
  endDate: new Date(Date.now() + 365 * 24 * 3600 * 1000),
  stripeSubscriptionId: "stripe-123",
  iapSubscriptionId: "iap-123",
  payments: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockPayment: Payment = {
  id: "payment-1",
  amount: 9.99,
  currency: "GBP",
  paymentDate: new Date(),
  userSubscriptionId: "user-sub-1",
  userSubscription: mockUserSubscription,
  stripePaymentId: "stripe-payment-123",
  iapPaymentId: "iap-payment-123",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockVehicleDetails: VehicleDetails = {
  id: "vehicle-details-1",
  registrationNumber: "ABC123",
  taxStatus: "Valid",
  taxDueDate: new Date(Date.now() + 365 * 24 * 3600 * 1000),
  motStatus: "Valid",
  yearOfManufacture: 2020,
  engineCapacity: 2000,
  co2Emissions: 150,
  fuelType: "Petrol",
  markedForExport: false,
  colour: "Red",
  typeApproval: "Approved",
  euroStatus: "Euro 6",
  dateOfLastV5CIssued: new Date(),
  motExpiryDate: new Date(Date.now() + 365 * 24 * 3600 * 1000),
  wheelplan: "4x2",
  monthOfFirstRegistration: new Date("2020-01-01"),
  vehicle: {} as Vehicle, // Circular reference, will be assigned later
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockPreviousVehicleDetails: VehicleDetails = {
  id: "vehicle-details-2",
  registrationNumber: "XYZ789",
  taxStatus: "Expired",
  taxDueDate: new Date(Date.now() - 365 * 24 * 3600 * 1000),
  motStatus: "Expired",
  yearOfManufacture: 2015,
  engineCapacity: 1800,
  co2Emissions: 140,
  fuelType: "Diesel",
  markedForExport: false,
  colour: "Blue",
  typeApproval: "Approved",
  euroStatus: "Euro 5",
  dateOfLastV5CIssued: new Date(),
  motExpiryDate: new Date(Date.now() - 365 * 24 * 3600 * 1000),
  wheelplan: "4x2",
  monthOfFirstRegistration: new Date("2015-01-01"),
  vehicle: {} as Vehicle, // Circular reference, will be assigned later
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockPreviousVehicle: Vehicle = {
  id: "vehicle-2",
  make: "Honda",
  model: "Civic",
  registrationNumber: "XYZ789",
  details: mockPreviousVehicleDetails,
  ownershipHistory: [],
  documents: [],
  events: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockDisplayPhoto1: MediaFile = {
  id: "display-photo-1",
  type: MediaFileType.photo,
  url: mockAssets.VEHICLE1_DISPLAY_PIC,
  document: {} as Document, // Circular reference, will be assigned later
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockDisplayPhoto2: MediaFile = {
  id: "display-photo-2",
  type: MediaFileType.photo,
  url: mockAssets.VEHICLE2_DISPLAY_PIC,
  document: {} as Document, // Circular reference, will be assigned later
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockVehicleOwnership: VehicleOwnership = {
  id: "vehicle-ownership-1",
  userId: "user-1",
  vehicleId: "vehicle-1",
  displayPicture: mockDisplayPhoto1,
  startDate: new Date(),
  endDate: new Date(Date.now() + 365 * 24 * 3600 * 1000),
  isCurrentOwner: true,
  isTemporaryOwner: false,
  canEditDocuments: true,
  user: mockUser,
  vehicle: mockVehicle,
  events: [], // Will be populated with mock events
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockPreviousVehicleOwnership: VehicleOwnership = {
  id: "vehicle-ownership-2",
  userId: "user-1",
  vehicleId: "vehicle-2",
  displayPicture: mockDisplayPhoto2,
  startDate: new Date(Date.now() - 2 * 365 * 24 * 3600 * 1000),
  endDate: new Date(Date.now() - 365 * 24 * 3600 * 1000),
  isCurrentOwner: false,
  isTemporaryOwner: false,
  canEditDocuments: false,
  user: mockUser,
  vehicle: mockPreviousVehicle,
  events: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockNotification: Notification = {
  id: "notification-1",
  title: "Welcome to the Premium Plan",
  message: "Thank you for subscribing to the Premium Plan.",
  user: mockUser,
  userId: "user-1",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockSession: Session = {
  id: "session-1",
  token: "session-token",
  userId: "user-1",
  user: mockUser,
  expiresAt: new Date(Date.now() + 3600 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockNotificationSubscription: NotificationSubscription = {
  id: "notification-sub-1",
  category: "Promotions",
  user: mockUser,
  userId: "user-1",
  createdAt: new Date(),
  updatedAt: new Date(),
}

// Assign circular references
mockUser.auth.user = mockUser
mockUser.subscription = mockUserSubscription
mockUser.events = mockVehicleEvents
mockVehicleOwnership.events = mockVehicleEvents
mockUser.session.push(mockSession)
mockUser.vehicleOwnerships.push(mockVehicleOwnership)
mockUser.vehicleOwnerships.push(mockPreviousVehicleOwnership) // Add previous vehicle ownership
mockUser.documents = [mockInvoiceDocument, mockProofOfOwnershipDocument]
mockUser.notificationSubs.push(mockNotificationSubscription)
mockUser.notifications.push(mockNotification)

mockSubscription.userSubscriptions.push(mockUserSubscription)

mockUserSubscription.payments.push(mockPayment)

mockVehicle.details.vehicle = mockVehicle
mockVehicle.events = mockVehicleEvents
mockVehicle.ownershipHistory.push(mockVehicleOwnership)
mockVehicle.documents = [mockInvoiceDocument, mockProofOfOwnershipDocument]

mockPreviousVehicle.details.vehicle = mockPreviousVehicle
mockPreviousVehicle.ownershipHistory.push(mockPreviousVehicleOwnership)

// Assign circular references for the new user
mock2ndUser.auth.user = mock2ndUser

export {
  mock2ndUser,
  mockNotification,
  mockNotificationSubscription,
  mockPayment,
  mockPreviousVehicle, // Export previous vehicle
  mockPreviousVehicleDetails,
  mockPreviousVehicleOwnership,
  mockSession,
  mockSubscription,
  mockUser,
  mockUserSubscription,
  mockVehicle,
  mockVehicleDetails,
  mockVehicleOwnership,
}
