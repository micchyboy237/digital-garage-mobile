import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PaymentModel } from "../payment/Payment"

export const SubscriptionModel = types
  .model("Subscription")
  .props({
    id: types.identifier,
    productId: types.string,
    plan: types.maybe(types.enumeration("SubscriptionPlan", ["DAY", "WEEK", "MONTH", "YEAR"])),
    status: types.enumeration("SubscriptionStatus", ["ACTIVE", "CANCELED", "EXPIRED"]),
    startDate: types.Date,
    endDate: types.maybe(types.maybeNull(types.Date)),
    expiresAt: types.maybe(types.Date),
    userId: types.maybe(types.string),
    payments: types.optional(types.array(types.reference(PaymentModel)), []),
  })
  .actions(withSetPropAction)

export interface Subscription extends Instance<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotOut extends SnapshotOut<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotIn extends SnapshotIn<typeof SubscriptionModel> {}
