import { Session, SessionModel } from "app/models/session/Session"
import { User, UserModel } from "app/models/user/User"
import { types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authUser: types.maybe(UserModel),
    authSession: types.maybe(SessionModel),
    // userStore: types.optional(UserStoreModel, {}),
    // sessionStore: types.optional(SessionStoreModel, {}),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authSession && !!store.authUser?.isEmailVerified
    },
    // get storesData() {
    //   return {
    //     users: store.userStore.users,
    //     sessions: store.sessionStore.sessions,
    //   }
    // },
    get validationError() {
      return ""
    },
  }))
  .actions((store) => ({
    setAuthUser(user: User) {
      store.authUser = user
      // store.userStore.addUser(user) // Add the user to UserStoreModel
    },
    setAuthSession(session: Session) {
      store.authSession = session
      // store.sessionStore.addSession(session) // Add the session to SessionStoreModel
    },
    logout() {
      store.authUser = undefined
      store.authSession = undefined
    },
  }))
