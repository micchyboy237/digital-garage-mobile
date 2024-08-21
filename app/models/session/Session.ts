import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const SessionModel = types
  .model("Session")
  .props({
    id: types.identifier,
    token: types.string,
    expiresAt: types.Date,
    provider: types.enumeration(["EMAIL_PASSWORD", "GOOGLE", "APPLE"]),
    userId: types.string,
  })
  .actions(withSetPropAction)

export interface Session extends Instance<typeof SessionModel> {}
export interface SessionSnapshotOut extends SnapshotOut<typeof SessionModel> {}
export interface SessionSnapshotIn extends SnapshotIn<typeof SessionModel> {}
