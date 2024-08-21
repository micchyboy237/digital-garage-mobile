import { Profile, ProfileModel } from "app/models/profile/Profile"
import { Session, SessionModel } from "app/models/session/Session"
import { Subscription, SubscriptionModel } from "app/models/subscription/Subscription"
import { User, UserModel } from "app/models/user/User"
import { types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authUser: types.maybe(types.maybeNull(UserModel)),
    authSession: types.maybe(types.maybeNull(SessionModel)),
    authProfile: types.maybe(types.maybeNull(ProfileModel)),
    authSubscription: types.maybe(types.maybeNull(SubscriptionModel)),
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
    setAuthProfile(profile: Profile) {
      store.authProfile = profile
    },
    setAuthSubscription(subscription: Subscription) {
      store.authSubscription = subscription
    },
    logout() {
      store.authUser = null
      store.authSession = null
      store.authProfile = null
      store.authSubscription = null
    },
  }))
