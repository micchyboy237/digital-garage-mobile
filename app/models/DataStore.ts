import { SessionModel } from "app/models/session/Session"
import { UserModel } from "app/models/user/User"
import { types } from "mobx-state-tree"

export const DataStoreModel = types.model("DataStore").props({
  user: types.maybe(UserModel),
  session: types.maybe(SessionModel),
})
