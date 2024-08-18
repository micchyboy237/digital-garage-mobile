import { BaseEntityModel } from "app/models/base"
import {
  DocumentTypeEnum,
  EventTypeEnum,
  MediaFileTypeEnum,
  PaymentIntervalEnum,
  SubscriptionStatusEnum,
  UserRoleEnum,
} from "app/models/enums"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const MediaFileModel = BaseEntityModel.named("MediaFile").props({
  type: MediaFileTypeEnum,
  mimeType: types.string,
  url: types.string,
})

export interface MediaFile extends Instance<typeof MediaFileModel> {}
export interface MediaFileSnapshot extends SnapshotOut<typeof MediaFileModel> {}

export const DocumentModel = BaseEntityModel.named("Document").props({
  type: DocumentTypeEnum,
  date: types.Date,
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  amount: types.maybe(types.number),
  createdBy: types.maybe(types.reference(types.late(() => UserModel))),
  createdById: types.string,
  files: types.array(MediaFileModel),
  vehicle: types.maybe(types.reference(types.late(() => VehicleModel))),
  vehicleId: types.maybe(types.string),
  vehicleEventId: types.maybe(types.string),
  vehicleEvent: types.maybe(types.reference(types.late(() => VehicleEventModel))),
})

export interface Document extends Instance<typeof DocumentModel> {}
export interface DocumentSnapshot extends SnapshotOut<typeof DocumentModel> {}

export const VehicleDetailsModel = BaseEntityModel.named("VehicleDetails").props({
  registrationNumber: types.string,
  taxStatus: types.string,
  taxDueDate: types.Date,
  motStatus: types.string,
  yearOfManufacture: types.number,
  engineCapacity: types.number,
  co2Emissions: types.number,
  fuelType: types.string,
  markedForExport: types.boolean,
  colour: types.string,
  typeApproval: types.string,
  euroStatus: types.string,
  dateOfLastV5CIssued: types.Date,
  motExpiryDate: types.Date,
  wheelplan: types.string,
  monthOfFirstRegistration: types.Date,
  vehicle: types.maybe(types.reference(types.late(() => VehicleModel))),
})

export interface VehicleDetails extends Instance<typeof VehicleDetailsModel> {}
export interface VehicleDetailsSnapshot extends SnapshotOut<typeof VehicleDetailsModel> {}

export const VehicleEventModel = BaseEntityModel.named("VehicleEvent").props({
  type: EventTypeEnum,
  header: types.string,
  description: types.maybe(types.string),
  date: types.Date,
  price: types.maybe(types.number),
  documents: types.array(DocumentModel),
  vehicleId: types.maybe(types.string),
  vehicle: types.maybe(types.reference(types.late(() => VehicleModel))),
  createdById: types.maybe(types.string),
  createdBy: types.maybe(types.reference(types.late(() => UserModel))),
})

export interface VehicleEvent extends Instance<typeof VehicleEventModel> {}
export interface VehicleEventSnapshot extends SnapshotOut<typeof VehicleEventModel> {}

export const VehicleOwnershipModel = BaseEntityModel.named("VehicleOwnership").props({
  userId: types.string,
  vehicleId: types.string,
  description: types.maybe(types.string),
  displayPicture: types.maybe(MediaFileModel),
  startDate: types.maybe(types.Date),
  endDate: types.maybe(types.Date),
  isCurrentOwner: types.boolean,
  isTemporaryOwner: types.boolean,
  canEditDocuments: types.boolean,
  user: types.maybe(types.reference(types.late(() => UserModel))),
  vehicle: types.maybe(types.reference(types.late(() => VehicleModel))),
  events: types.array(VehicleEventModel),
})

export interface VehicleOwnership extends Instance<typeof VehicleOwnershipModel> {}
export interface VehicleOwnershipSnapshot extends SnapshotOut<typeof VehicleOwnershipModel> {}

export const VehicleModel = BaseEntityModel.named("Vehicle").props({
  make: types.string,
  model: types.string,
  registrationNumber: types.string,
  details: VehicleDetailsModel,
  ownershipHistory: types.array(VehicleOwnershipModel),
  documents: types.array(DocumentModel),
  events: types.array(VehicleEventModel),
})

export interface Vehicle extends Instance<typeof VehicleModel> {}
export interface VehicleSnapshot extends SnapshotOut<typeof VehicleModel> {}

export const PaymentModel = BaseEntityModel.named("Payment").props({
  amount: types.number,
  currency: types.string,
  paymentDate: types.Date,
  userSubscriptionId: types.string,
  userSubscription: types.reference(types.late(() => UserSubscriptionModel)),
  stripePaymentId: types.maybe(types.string),
  iapPaymentId: types.maybe(types.string),
})

export interface Payment extends Instance<typeof PaymentModel> {}
export interface PaymentSnapshot extends SnapshotOut<typeof PaymentModel> {}

export const SubscriptionModel = BaseEntityModel.named("Subscription").props({
  name: types.string,
  freeTrialDuration: types.maybe(types.number),
  price: types.maybe(types.number),
  currency: types.string,
  paymentInterval: PaymentIntervalEnum,
  userSubscriptions: types.array(types.late(() => UserSubscriptionModel)),
})

export interface Subscription extends Instance<typeof SubscriptionModel> {}
export interface SubscriptionSnapshot extends SnapshotOut<typeof SubscriptionModel> {}

export const UserSubscriptionModel = BaseEntityModel.named("UserSubscription").props({
  subscription: types.reference(SubscriptionModel),
  subscriptionId: types.string,
  user: types.reference(types.late(() => UserModel)),
  userId: types.string,
  status: SubscriptionStatusEnum,
  trialStartDate: types.maybe(types.Date),
  trialEndDate: types.maybe(types.Date),
  startDate: types.maybe(types.Date),
  endDate: types.maybe(types.Date),
  payments: types.array(PaymentModel),
})

export interface UserSubscription extends Instance<typeof UserSubscriptionModel> {}
export interface UserSubscriptionSnapshot extends SnapshotOut<typeof UserSubscriptionModel> {}

export const AuthModel = BaseEntityModel.named("Auth").props({
  password: types.maybe(types.string),
  googleId: types.maybe(types.string),
  emailVerificationCode: types.maybe(types.string),
  emailVerificationExpiry: types.maybe(types.Date),
  isEmailVerified: types.boolean,
  userId: types.string,
  user: types.reference(types.late(() => UserModel)),
  passwordResetToken: types.maybe(types.string),
  passwordResetExpiry: types.maybe(types.Date),
})

export interface Auth extends Instance<typeof AuthModel> {}
export interface AuthSnapshot extends SnapshotOut<typeof AuthModel> {}

export const SessionModel = BaseEntityModel.named("Session").props({
  id: types.identifier,
  token: types.string,
  expiresAt: types.Date,
  userId: types.string,
  user: types.maybe(types.reference(types.late(() => UserModel))),
})

export interface Session extends Instance<typeof SessionModel> {}
export interface SessionSnapshot extends SnapshotOut<typeof SessionModel> {}

export const NotificationSubscriptionModel = BaseEntityModel.named(
  "NotificationSubscription",
).props({
  category: types.string,
  user: types.maybe(types.reference(types.late(() => UserModel))),
  userId: types.maybe(types.string),
})

export interface NotificationSubscription extends Instance<typeof NotificationSubscriptionModel> {}
export interface NotificationSubscriptionSnapshot
  extends SnapshotOut<typeof NotificationSubscriptionModel> {}

export const NotificationModel = BaseEntityModel.named("Notification").props({
  title: types.string,
  message: types.string,
  user: types.reference(types.late(() => UserModel)),
  userId: types.string,
})

export interface Notification extends Instance<typeof NotificationModel> {}
export interface NotificationSnapshot extends SnapshotOut<typeof NotificationModel> {}

export const UserModel = BaseEntityModel.named("User").props({
  role: UserRoleEnum,
  id: types.identifier,
  email: types.string,
  firstName: types.maybe(types.string),
  lastName: types.maybe(types.string),
  profilePicture: types.maybe(MediaFileModel),
  // auth: types.maybe(types.reference(types.late(() => AuthModel)),
})

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshot extends SnapshotOut<typeof UserModel> {}
