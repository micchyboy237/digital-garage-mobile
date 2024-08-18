import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Profile, ProfileModel } from "./Profile"

export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    profiles: types.array(ProfileModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addProfile(profile: Profile) {
      store.profiles.push(profile)
    },
    removeProfile(profile: Profile) {
      store.profiles.remove(profile)
    },
  }))

export interface ProfileStore extends Instance<typeof ProfileStoreModel> {}
export interface ProfileStoreSnapshot extends SnapshotOut<typeof ProfileStoreModel> {}
