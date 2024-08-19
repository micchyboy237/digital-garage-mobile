
import { SessionModel } from "app/models/session/Session"
import { SessionStoreModel } from "app/models/session/SessionStore"
import { UserModel } from "app/models/user/User"

const user1 = UserModel.create({
  id: "user1",
  email: "user1@example.com",
  firebaseUid: "user1FirebaseUid",
  provider: "EMAIL_PASSWORD",
  profile: "profile1",
  subscription: "subscription1",
  accountStatus: "ACTIVE",
})

export const session1 = SessionModel.create({
  id: "session1",
  token: "token1",
  expiresAt: new Date("2024-12-31T23:59:59Z"),
  user: user1.id,
})

const sessionStore = SessionStoreModel.create({ sessions: [] })
sessionStore.addSession(session1)

describe("Session 1", () => {
  it("session model has correct data", () => {
    expect(session1.id).toBe("session1")
    expect(session1.token).toBe("token1")
    expect(session1.expiresAt.toISOString()).toBe("2024-12-31T23:59:59.000Z")
    expect(session1.user.id).toBe("user1")
  })
})
