import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { User, UserModel } from "./User"

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
