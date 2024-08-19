import os

# Directory paths
model_name = "session"
base_path = f"app/models/{model_name}"

# Create directories for the model
os.makedirs(base_path, exist_ok=True)

# Session Model content
session_model_content = """
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { UserModel } from "../user/User"

export const SessionModel = types
  .model("Session")
  .props({
    id: types.identifier,
    token: types.string,
    expiresAt: types.Date,
    user: types.reference(UserModel),
  })
  .actions(withSetPropAction)

export interface Session extends Instance<typeof SessionModel> {}
export interface SessionSnapshotOut extends SnapshotOut<typeof SessionModel> {}
export interface SessionSnapshotIn extends SnapshotIn<typeof SessionModel> {}
"""

# Session Store content
session_store_content = """
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Session, SessionModel } from "./Session"

export const SessionStoreModel = types
  .model("SessionStore")
  .props({
    sessions: types.array(SessionModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addSession(session: Session) {
      store.sessions.push(session)
    },
    removeSession(session: Session) {
      store.sessions.remove(session)
    },
  }))

export interface SessionStore extends Instance<typeof SessionStoreModel> {}
export interface SessionStoreSnapshot extends SnapshotOut<typeof SessionStoreModel> {}
"""

# Session Test content
session_test_content = """
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
"""

# Create model files
with open(f"{base_path}/Session.ts", "w") as model_file:
    model_file.write(session_model_content)

# Create store files
with open(f"{base_path}/SessionStore.ts", "w") as store_file:
    store_file.write(session_store_content)

# Create test files
with open(f"{base_path}/Session.test.ts", "w") as test_file:
    test_file.write(session_test_content)

print("Session model, store, and test files have been created successfully.")
