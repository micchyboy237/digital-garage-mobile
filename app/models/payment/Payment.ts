import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const PaymentModel = types
  .model("Payment")
  .props({
    id: types.identifier,
    price: types.number,
    currencyCode: types.string,
    status: types.enumeration("PaymentStatus", ["PAID", "REFUNDED", "FAILED"]),
    transactionId: types.string,
    transactionDate: types.Date, // Matches `transactionDate` as DateTime
    subscriptionId: types.string, // Store the subscription ID as a string
    // subscription: types.reference(SubscriptionModel), // Reference SubscriptionModel
  })
  .actions(withSetPropAction)

export interface Payment extends Instance<typeof PaymentModel> {}
export interface PaymentSnapshotOut extends SnapshotOut<typeof PaymentModel> {}
export interface PaymentSnapshotIn extends SnapshotIn<typeof PaymentModel> {}
