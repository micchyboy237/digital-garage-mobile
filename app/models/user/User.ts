import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Profile, ProfileModel } from "../profile/Profile"
import { SubscriptionModel } from "../subscription/Subscription"

export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    email: types.string,
    password: types.maybe(types.string),
    firebaseUid: types.string,
    provider: types.enumeration(["EMAIL_PASSWORD", "GOOGLE", "APPLE"]),
    profile: types.maybe(types.reference(ProfileModel)), // Reference to ProfileModel
    subscription: types.maybe(types.reference(SubscriptionModel)), // Reference to SubscriptionModel
    accountStatus: types.enumeration(["ONBOARDING", "SELECT_SUBSCRIPTION", "ACTIVE"]),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setProfile(profile: Profile) {
      self.profile = profile
    },
  }))

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
