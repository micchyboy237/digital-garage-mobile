
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Payment, PaymentModel } from "./Payment"

export const PaymentStoreModel = types
  .model("PaymentStore")
  .props({
    payments: types.array(PaymentModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addPayment(payment: Payment) {
      store.payments.push(payment)
    },
    removePayment(payment: Payment) {
      store.payments.remove(payment)
    },
  }))

export interface PaymentStore extends Instance<typeof PaymentStoreModel> {}
export interface PaymentStoreSnapshot extends SnapshotOut<typeof PaymentStoreModel> {}
