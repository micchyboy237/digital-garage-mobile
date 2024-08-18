import { subscription1 } from "app/models/subscription/Subscription.test"
import { PaymentModel } from "./Payment"
import { PaymentStoreModel } from "./PaymentStore"

const paymentStore = PaymentStoreModel.create({ payments: [] })

export const firstTransactionDate = new Date("2021-02-14T00:00:00Z")

export const payment1 = PaymentModel.create({
  id: "payment1",
  amount: 100,
  currency: "GBP",
  status: "PAID",
  transactionDate: firstTransactionDate,
  subscriptionId: subscription1.id,
})
export const payment2 = PaymentModel.create({
  id: "payment2",
  amount: 200,
  currency: "USD",
  status: "PAID",
  // firstTransactionDate + 1 month
  transactionDate: new Date(firstTransactionDate.setMonth(firstTransactionDate.getMonth() + 1)),
  subscriptionId: subscription1.id,
})

// Add the payment to the store
paymentStore.addPayment(payment1)
paymentStore.addPayment(payment2)

test("payment model has correct data", () => {
  expect(payment1.id).toBe("pay1")
  expect(payment1.amount).toBe(100.0)
  expect(payment1.currency).toBe("USD")
  expect(payment1.status).toBe("PAID")
  expect(payment1.subscriptionId).toBe("sub1")
})
