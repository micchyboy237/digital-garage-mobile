### Analysis and Implementation Plan

Based on the given files and schema, we can outline the following tasks:

1. **Stores & Models**:
   - Create corresponding models and stores for `User`, `Profile`, `Subscription`, and `Payment`.
   - Each model should have appropriate actions, views, and type definitions following the MobX-State-Tree (MST) pattern observed in the `Episode` model.

2. **Test Files**:
   - Create test files for each model to validate their properties, actions, and views, following the pattern observed in the `Episode.test.ts` file.

3. **Schema Validation**:
   - Ensure the MST models align with the Prisma schema and implement necessary validations or type adjustments.

### 1. Stores & Models

#### **User Model & Store**
- **Model File**: `app/models/user/User.ts`
```typescript
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel } from "../profile/Profile"
import { SubscriptionModel } from "../subscription/Subscription"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    email: types.string,
    password: types.maybe(types.string),
    firebaseUid: types.string,
    provider: types.enumeration(["EMAIL_PASSWORD", "GOOGLE", "APPLE"]),
    createdAt: types.string,
    updatedAt: types.string,
    profile: types.maybe(ProfileModel),
    subscription: types.maybe(SubscriptionModel),
  })
  .actions(withSetPropAction)

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
```

- **Store File**: `app/models/user/UserStore.ts`
```typescript
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "./User"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.array(UserModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addUser(user) {
      store.users.push(user)
    },
    removeUser(user) {
      store.users.remove(user)
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
```

#### **Profile Model & Store**
- **Model File**: `app/models/profile/Profile.ts`
```typescript
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const ProfileModel = types
  .model("Profile")
  .props({
    id: types.identifier,
    firstName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    profilePicture: types.maybe(types.string),
    location: types.maybe(types.string),
    userId: types.string,
    accountStatus: types.enumeration(["ONBOARDING", "SELECT_SUBSCRIPTION", "ACTIVE"]),
  })
  .actions(withSetPropAction)

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
```

- **Store File**: `app/models/profile/ProfileStore.ts`
```typescript
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel } from "./Profile"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profiles: types.array(ProfileModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addProfile(profile) {
      store.profiles.push(profile)
    },
    removeProfile(profile) {
      store.profiles.remove(profile)
    },
  }))

export interface ProfileStore extends Instance<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshot extends SnapshotOut<typeof ProfileStoreModel> {}
```

#### **Subscription Model & Store**
- **Model File**: `app/models/subscription/Subscription.ts`
```typescript
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { PaymentModel } from "../payment/Payment"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const SubscriptionModel = types
  .model("Subscription")
  .props({
    id: types.identifier,
    plan: types.maybe(types.enumeration(["MONTHLY", "YEARLY", "WEEKLY", "CUSTOM"])),
    status: types.enumeration(["ACTIVE", "INACTIVE", "CANCELED", "EXPIRED"]),
    startDate: types.maybe(types.string),
    endDate: types.maybe(types.string),
    userId: types.string,
    payments: types.array(PaymentModel),
  })
  .actions(withSetPropAction)

export interface Subscription extends Instance<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotOut extends SnapshotOut<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotIn extends SnapshotIn<typeof SubscriptionModel> {}
```

- **Store File**: `app/models/subscription/SubscriptionStore.ts`
```typescript
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SubscriptionModel } from "./Subscription"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const SubscriptionStoreModel = types
  .model("SubscriptionStore")
  .props({
    subscriptions: types.array(SubscriptionModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addSubscription(subscription) {
      store.subscriptions.push(subscription)
    },
    removeSubscription(subscription) {
      store.subscriptions.remove(subscription)
    },
  }))

export interface SubscriptionStore extends Instance<typeof SubscriptionStoreModel> {}
export interface SubscriptionStoreSnapshot extends SnapshotOut<typeof SubscriptionStoreModel> {}
```

#### **Payment Model & Store**
- **Model File**: `app/models/payment/Payment.ts`
```typescript
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const PaymentModel = types
  .model("Payment")
  .props({
    id: types.identifier,
    amount: types.number,
    currency: types.string,
    status: types.enumeration(["PAID", "REFUNDED", "PENDING", "FAILED"]),
    transactionDate: types.string,
    subscriptionId: types.string,
  })
  .actions(withSetPropAction)

export interface Payment extends Instance<typeof PaymentModel> {}
export interface PaymentSnapshotOut extends SnapshotOut<typeof PaymentModel> {}
export interface PaymentSnapshotIn extends SnapshotIn<typeof PaymentModel> {}
```

- **Store File**: `app/models/payment/PaymentStore.ts`
```typescript
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PaymentModel } from "./Payment"
import { withSetPropAction } from "../helpers/withSetPropAction"

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
```

### 2. Test Files

#### **User Test File**
- **Test File**: `app/models/user/User.test.ts`
```typescript
import { UserModel } from "./User"

const data = {
  id: "1",
  email: "test@example.com",
  firebaseUid: "firebaseUid",
  provider: "GOOGLE",
  createdAt: "2024-08-18T00:00:00.000Z",
  updatedAt: "2024-08-18T00:00:00.000Z",
}

const user = UserModel.create(data)

test("user model has correct data", () => {
  expect(user.email).toBe("test@example.com")
  expect(user.provider).toBe("GOOGLE")
})
```

#### **Profile Test File**
- **Test File**: `app/models/profile/Profile.test.ts`
```typescript
import { ProfileModel } from "./Profile"

const data = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  profilePicture: "https://example.com/profile.jpg",
  location: "New York",
  userId: "1",
  accountStatus: "ACTIVE",
}

const profile = ProfileModel.create(data)

test("profile model has correct data", () => {
  expect(profile.firstName).toBe("John")
  expect(profile.accountStatus).toBe("ACTIVE")
})
```

#### **Subscription Test File**
- **Test File**: `app/models/subscription/Subscription.test.ts`
```typescript
import { SubscriptionModel } from "./Subscription"

const data = {
  id: "1",
  plan: "MONTHLY",
  status: "ACTIVE",
  startDate: "2024-08-18T00:00:00.000Z",
  endDate: "2024-09-18T00:00:00.000Z",
  userId: "1",
}

const subscription = SubscriptionModel.create(data)

test

("subscription model has correct data", () => {
  expect(subscription.plan).toBe("MONTHLY")
  expect(subscription.status).toBe("ACTIVE")
})
```

#### **Payment Test File**
- **Test File**: `app/models/payment/Payment.test.ts`
```typescript
import { PaymentModel } from "./Payment"

const data = {
  id: "1",
  amount: 100.0,
  currency: "USD",
  status: "PAID",
  transactionDate: "2024-08-18T00:00:00.000Z",
  subscriptionId: "1",
}

const payment = PaymentModel.create(data)

test("payment model has correct data", () => {
  expect(payment.amount).toBe(100.0)
  expect(payment.status).toBe("PAID")
})
```

### 3. Schema Validation

Ensure that the models and types align with the Prisma schema and adjust if any discrepancies are found. All fields, types, and enumerations should correspond directly to those defined in `schema.prisma`.

This approach follows the existing conventions and structures seen in the `Episode` files. Let me know if you need further adjustments or additional details.

### 4. AI Prompt Auto-Generation
- **Python Script File**: `app/scripts/auto_generate_models.py`
```python
import os

# Create directories for models
os.makedirs("app/models/user", exist_ok=True)
os.makedirs("app/models/profile", exist_ok=True)
os.makedirs("app/models/subscription", exist_ok=True)
os.makedirs("app/models/payment", exist_ok=True)

# Create model file
with open("app/models/user/User.ts", "w") as user_file:
    user_file.write("""
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProfileModel } from "../profile/Profile"
import { SubscriptionModel } from "../subscription/Subscription"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    email: types.string,
    password: types.maybe(types.string),
    firebaseUid: types.string,
    provider: types.enumeration(["EMAIL_PASSWORD", "GOOGLE", "APPLE"]),
    createdAt: types.string,
    updatedAt: types.string,
    profile: types.maybe(ProfileModel),
    subscription: types.maybe(SubscriptionModel),
  })
  .actions(withSetPropAction)

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
""")

# Create store file
with open("app/models/user/UserStore.ts", "w") as user_store_file:
    user_store_file.write("""
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { User, UserModel } from "./User"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.array(UserModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addUser(user: User) {
      store.users.push(user)
    },
    removeUser(user: User) {
      store.users.remove(user)
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
""")

# Create test file
with open("app/models/user/User.test.ts", "w") as user_test_file:
    user_test_file.write("""
import { UserModel } from "./User"

const data = {
  id: "1",
  email: "test@example.com",
  firebaseUid: "firebaseUid",
  provider: "GOOGLE",
  createdAt: "2024-08-18T00:00:00.000Z",
  updatedAt: "2024-08-18T00:00:00.000Z",
}

const user = UserModel.create(data)

test("user model has correct data", () => {
  expect(user.email).toBe("test@example.com")
  expect(user.provider).toBe("GOOGLE")
})
""")

# Please continue the python script for profile, subscription and payment
```
