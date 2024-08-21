import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const ProfileModel = types
  .model("Profile")
  .props({
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    profilePicture: types.maybeNull(types.string),
    location: types.string,
    userId: types.string,
  })
  .actions(withSetPropAction)

export interface Profile extends Instance<typeof ProfileModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> {}
