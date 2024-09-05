import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { AuthProvider } from "./AuthProvider"

export const AccountModel = types.model("Account", {
  id: types.string,
  provider: types.enumeration<readonly string[]>(Object.values(AuthProvider)),
  userId: types.string,
  firebaseUid: types.string,
  isEmailVerified: types.boolean,
  lastLogin: types.maybeNull(types.Date),
  createdAt: types.optional(types.Date, () => new Date()),
  updatedAt: types.optional(types.Date, () => new Date()),
})

export interface Account extends Instance<typeof AccountModel> {}
export interface AccountSnapshotOut extends SnapshotOut<typeof AccountModel> {}
export interface AccountSnapshotIn extends SnapshotIn<typeof AccountModel> {}
