import os

# Define the models, stores, and test content
models = {
    "Account": {
        "model": """
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "../user/User"

export const AccountModel = types
  .model("Account")
  .props({
    id: types.identifier,
    provider: types.enumeration("AuthProvider", ["EMAIL_PASSWORD", "GOOGLE", "APPLE"]),
    firebaseUid: types.string,
    isEmailVerified: types.boolean,
    accountStatus: types.enumeration([
      "ONBOARDING",
      "SELECT_SUBSCRIPTION",
      "ACTIVE",
    ]),
    email: types.string,
    user: types.maybe(types.reference(UserModel)),
  })
  .actions(withSetPropAction)

export interface Account extends Instance<typeof AccountModel> {}
export interface AccountSnapshotOut extends SnapshotOut<typeof AccountModel> {}
export interface AccountSnapshotIn extends SnapshotIn<typeof AccountModel> {}
        """,
        "store": """
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { AccountModel } from "./Account"

export const AccountStoreModel = types
  .model("AccountStore")
  .props({
    accounts: types.array(AccountModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addAccount(account) {
      store.accounts.push(account)
    },
    removeAccount(account) {
      store.accounts.remove(account)
    },
  }))

export interface AccountStore extends Instance<typeof AccountStoreModel> {}
export interface AccountStoreSnapshot extends SnapshotOut<typeof AccountStoreModel> {}
        """,
        "test": """
import { AccountModel } from "./Account"
import { AccountStoreModel } from "./AccountStore"
import { user1 } from "app/models/user/User.test"

const accountStore = AccountStoreModel.create({ accounts: [] })

export const account1 = AccountModel.create({
  id: "account1",
  provider: "EMAIL_PASSWORD",
  firebaseUid: "user1FirebaseUid",
  isEmailVerified: false,
  accountStatus: "ONBOARDING",
  email: "user1@example.com",
  user: user1.id,
})

accountStore.addAccount(account1)

test("account model has correct data", () => {
  expect(account1.id).toBe("account1")
  expect(account1.provider).toBe("EMAIL_PASSWORD")
  expect(account1.firebaseUid).toBe("user1FirebaseUid")
  expect(account1.isEmailVerified).toBe(false)
  expect(account1.accountStatus).toBe("ONBOARDING")
  expect(account1.email).toBe("user1@example.com")
  expect(account1.user.id).toBe("user1")
})
        """
    },
    "Payment": {
        "model": """
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { SubscriptionModel } from "../subscription/Subscription"

export const PaymentModel = types
  .model("Payment")
  .props({
    id: types.identifier,
    price: types.number,
    currencyCode: types.string,
    status: types.enumeration("PaymentStatus", ["PAID", "REFUNDED", "PENDING", "FAILED"]),
    transactionId: types.string,
    transactionDate: types.Date,
    subscription: types.reference(SubscriptionModel),
  })
  .actions(withSetPropAction)

export interface Payment extends Instance<typeof PaymentModel> {}
export interface PaymentSnapshotOut extends SnapshotOut<typeof PaymentModel> {}
export interface PaymentSnapshotIn extends SnapshotIn<typeof PaymentModel> {}
        """,
        "store": """
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { PaymentModel } from "./Payment"

export const PaymentStoreModel = types
  .model("PaymentStore")
  .props({
    payments: types.array(PaymentModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addPayment(payment) {
      store.payments.push(payment)
    },
    removePayment(payment) {
      store.payments.remove(payment)
    },
  }))

export interface PaymentStore extends Instance<typeof PaymentStoreModel> {}
export interface PaymentStoreSnapshot extends SnapshotOut<typeof PaymentStoreModel> {}
        """,
        "test": """
import { PaymentModel } from "./Payment"
import { PaymentStoreModel } from "./PaymentStore"
import { subscription1 } from "app/models/subscription/Subscription.test"

const paymentStore = PaymentStoreModel.create({ payments: [] })

export const firstTransactionDate = new Date("2021-02-14T00:00:00Z")

export const payment1 = PaymentModel.create({
  id: "payment1",
  price: 100,
  currencyCode: "GBP",
  status: "PAID",
  transactionDate: firstTransactionDate,
  subscription: subscription1.id,
})

export const payment2 = PaymentModel.create({
  id: "payment2",
  price: 200,
  currencyCode: "USD",
  status: "PAID",
  transactionDate: new Date(firstTransactionDate.setMonth(firstTransactionDate.getMonth() + 1)),
  subscription: subscription1.id,
})

paymentStore.addPayment(payment1)
paymentStore.addPayment(payment2)

test("payment model has correct data", () => {
  expect(payment1.id).toBe("payment1")
  expect(payment1.price).toBe(100)
  expect(payment1.currencyCode).toBe("GBP")
  expect(payment1.status).toBe("PAID")
  expect(payment1.subscription.id).toBe("sub1")
})
        """
    }
}

# Create directories and files for each model
for model_name, contents in models.items():
    model_dir = f"app/models/{model_name.lower()}"
    os.makedirs(model_dir, exist_ok=True)

    with open(f"{model_dir}/{model_name}.ts", "w") as model_file:
        model_file.write(contents["model"])

    with open(f"{model_dir}/{model_name}Store.ts", "w") as store_file:
        store_file.write(contents["store"])

    with open(f"{model_dir}/{model_name}.test.ts", "w") as test_file:
        test_file.write(contents["test"])
