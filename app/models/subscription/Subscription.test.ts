import { payment1, payment2 } from "app/models/payment/Payment.test"
import { SubscriptionModel } from "./Subscription"
import { SubscriptionStoreModel } from "./SubscriptionStore"

const subscriptionStore = SubscriptionStoreModel.create({ subscriptions: [] })

export const subscription1 = SubscriptionModel.create({
  id: "sub1",
  plan: "MONTHLY",
  status: "ACTIVE",
  startDate: payment1.transactionDate,
  endDate: undefined,
  userId: "user1",
  payments: [payment1.id, payment2.id],
})

export const subscription2 = SubscriptionModel.create({
  id: "sub2",
  plan: "YEARLY",
  status: "CANCELED",
  // 1.5 year ago
  startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1.5)),
  // startDate + 1 year
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 0.5)),
  userId: "user2",
  payments: [],
})

export const subscription3 = SubscriptionModel.create({
  id: "sub3",
  plan: "MONTHLY",
  status: "EXPIRED",
  // 3 months ago
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
  // startDate + 1 month
  endDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
  userId: "user3",
  payments: [],
})

// Add the subscription to the store
subscriptionStore.addSubscription(subscription1)
subscriptionStore.addSubscription(subscription2)
subscriptionStore.addSubscription(subscription3)

test("subscription model has correct data", () => {
  expect(subscription1.id).toBe("sub1")
  expect(subscription1.plan).toBe("MONTHLY")
  expect(subscription1.status).toBe("ACTIVE")
  expect(subscription1.userId).toBe("user1")
})

test("subscription payments are correct", () => {
  expect(subscription1.payments.length).toBe(2)
  expect(subscription1.payments[0].id).toBe("payment1")
  expect(subscription1.payments[1].id).toBe("payment2")
}, 1000)
