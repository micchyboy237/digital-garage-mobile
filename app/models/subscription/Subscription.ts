import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PaymentModel } from "../payment/Payment"

export const SubscriptionModel = types
  .model("Subscription")
  .props({
    id: types.identifier,
    plan: types.maybe(
      types.enumeration("SubscriptionPlan", ["MONTHLY", "YEARLY", "WEEKLY", "CUSTOM"]),
    ),
    status: types.enumeration("SubscriptionStatus", ["ACTIVE", "CANCELED", "EXPIRED"]),
    startDate: types.maybe(types.Date),
    endDate: types.maybe(types.Date),
    userId: types.string, // Corresponds to `userId` in the schema
    payments: types.optional(types.array(types.reference(PaymentModel)), []), // Directly reference PaymentModel
  })
  .actions(withSetPropAction)

export interface Subscription extends Instance<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotOut extends SnapshotOut<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotIn extends SnapshotIn<typeof SubscriptionModel> {}
