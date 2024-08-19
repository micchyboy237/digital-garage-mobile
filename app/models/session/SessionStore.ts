
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
