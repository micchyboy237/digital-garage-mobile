import { Session, SessionModel, User, UserModel } from "app/models/models"
import { types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authUser: types.maybe(UserModel),
    authSession: types.maybe(SessionModel),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authSession
    },
    get user() {
      return store.authUser
    },
    get session() {
      return store.authSession
    },
    get validationError() {
      return ""
    },
  }))
  .actions((store) => ({
    setAuthUser(value: User) {
      store.authUser = value
    },
    setAuthSession(value: Session) {
      store.authSession = value
    },
    logout() {
      store.authUser = undefined
      store.authSession = undefined
    },
  }))
