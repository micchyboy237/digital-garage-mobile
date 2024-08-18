import os

# Define the content for each file

# Subscription Model
subscription_model_content = """
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PaymentModel } from "../payment/Payment"

export const SubscriptionModel = types
  .model("Subscription")
  .props({
    id: types.identifier,
    plan: types.maybe(types.enumeration(["MONTHLY", "YEARLY", "WEEKLY", "CUSTOM"])),
    status: types.enumeration(["ACTIVE", "INACTIVE", "CANCELED", "EXPIRED"]),
    startDate: types.maybe(types.string),
    endDate: types.maybe(types.string),
    userId: types.string,
    payments: types.optional(types.array(types.reference(PaymentModel)), []),
  })
  .actions(withSetPropAction)

export interface Subscription extends Instance<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotOut extends SnapshotOut<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotIn extends SnapshotIn<typeof SubscriptionModel> {}
"""

# Subscription Store
subscription_store_content = """
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Subscription, SubscriptionModel } from "./Subscription"

export const SubscriptionStoreModel = types
  .model("SubscriptionStore")
  .props({
    subscriptions: types.array(SubscriptionModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addSubscription(subscription: Subscription) {
      store.subscriptions.push(subscription)
    },
    removeSubscription(subscription: Subscription) {
      store.subscriptions.remove(subscription)
    },
  }))

export interface SubscriptionStore extends Instance<typeof SubscriptionStoreModel> {}
export interface SubscriptionStoreSnapshot extends SnapshotOut<typeof SubscriptionStoreModel> {}
"""

# Subscription Test
subscription_test_content = """
import { SubscriptionModel } from "./Subscription"
import { SubscriptionStoreModel } from "./SubscriptionStore"

const subscriptionStore = SubscriptionStoreModel.create({ subscriptions: [] })

const subscription = SubscriptionModel.create({
  id: "sub1",
  plan: "MONTHLY",
  status: "ACTIVE",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  userId: "user1",
})

// Add the subscription to the store
subscriptionStore.addSubscription(subscription)

test("subscription model has correct data", () => {
  expect(subscription.id).toBe("sub1")
  expect(subscription.plan).toBe("MONTHLY")
  expect(subscription.status).toBe("ACTIVE")
  expect(subscription.userId).toBe("user1")
})
"""

# Payment Model
payment_model_content = """
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { SubscriptionModel } from "../subscription/Subscription"

export const PaymentModel = types
  .model("Payment")
  .props({
    id: types.identifier,
    amount: types.number,
    currency: types.string,
    status: types.enumeration(["PAID", "REFUNDED", "PENDING", "FAILED"]),
    transactionDate: types.string,
    subscriptionId: types.string,
    subscription: types.reference(SubscriptionModel),
  })
  .actions(withSetPropAction)

export interface Payment extends Instance<typeof PaymentModel> {}
export interface PaymentSnapshotOut extends SnapshotOut<typeof PaymentModel> {}
export interface PaymentSnapshotIn extends SnapshotIn<typeof PaymentModel> {}
"""

# Payment Store
payment_store_content = """
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
"""

# Payment Test
payment_test_content = """
import { PaymentModel } from "./Payment"
import { PaymentStoreModel } from "./PaymentStore"
import { SubscriptionModel } from "../subscription/Subscription"

const paymentStore = PaymentStoreModel.create({ payments: [] })

const subscription = SubscriptionModel.create({
  id: "sub1",
  plan: "MONTHLY",
  status: "ACTIVE",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  userId: "user1",
})

const payment = PaymentModel.create({
  id: "pay1",
  amount: 100.0,
  currency: "USD",
  status: "PAID",
  transactionDate: new Date().toISOString(),
  subscriptionId: subscription.id,
  subscription: subscription,
})

// Add the payment to the store
paymentStore.addPayment(payment)

test("payment model has correct data", () => {
  expect(payment.id).toBe("pay1")
  expect(payment.amount).toBe(100.0)
  expect(payment.currency).toBe("USD")
  expect(payment.status).toBe("PAID")
  expect(payment.subscriptionId).toBe("sub1")
})
"""

# Function to create files and directories


def create_files_and_directories():
    models = [
        ("subscription", subscription_model_content,
         subscription_store_content, subscription_test_content),
        ("payment", payment_model_content,
         payment_store_content, payment_test_content),
    ]

    for model_name, model_content, store_content, test_content in models:
        os.makedirs(f"app/models/{model_name}", exist_ok=True)

        with open(f"app/models/{model_name}/{model_name.capitalize()}.ts", "w") as model_file:
            model_file.write(model_content)

        with open(f"app/models/{model_name}/{model_name.capitalize()}Store.ts", "w") as store_file:
            store_file.write(store_content)

        with open(f"app/models/{model_name}/{model_name.capitalize()}.test.ts", "w") as test_file:
            test_file.write(test_content)


if __name__ == "__main__":
    create_files_and_directories()
