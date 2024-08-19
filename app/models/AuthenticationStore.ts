import { Session, SessionModel } from "app/models/session/Session"
import { SessionStoreModel } from "app/models/session/SessionStore"
import { User, UserModel } from "app/models/user/User"
import { UserStoreModel } from "app/models/user/UserStore"
import { types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authUser: types.maybe(UserModel),
    authSession: types.maybe(SessionModel),
    userStore: types.optional(UserStoreModel, {}),
    sessionStore: types.optional(SessionStoreModel, {}),
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
    setAuthUser(user: User) {
      store.authUser = user
      store.userStore.addUser(user) // Add the user to UserStoreModel
    },
    setAuthSession(session: Session) {
      store.authSession = session
      store.sessionStore.addSession(session) // Add the session to SessionStoreModel
    },
    logout() {
      store.authUser = undefined
      store.authSession = undefined
    },
  }))
