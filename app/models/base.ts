import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const BaseEntityModel = types.model({
  id: types.identifier,
  createdAt: types.Date,
  updatedAt: types.Date,
})

export interface BaseEntity extends Instance<typeof BaseEntityModel> {}
export interface BaseEntitySnapshot extends SnapshotOut<typeof BaseEntityModel> {}
