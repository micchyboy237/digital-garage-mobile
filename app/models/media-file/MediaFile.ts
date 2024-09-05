import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { MediaFileType } from "./MediaFileType"

export const MediaFileModel = types.model("MediaFile", {
  id: types.string,
  type: types.enumeration<readonly string[]>(Object.values(MediaFileType)),
  mimeType: types.string,
  fileName: types.string,
  url: types.string,
  thumbnailUrl: types.string,
  postId: types.maybeNull(types.string),
  ownershipId: types.maybeNull(types.string),
  createdAt: types.optional(types.Date, () => new Date()),
  updatedAt: types.optional(types.Date, () => new Date()),
})

export interface MediaFile extends Instance<typeof MediaFileModel> {}
export interface MediaFileSnapshotOut extends SnapshotOut<typeof MediaFileModel> {}
export interface MediaFileSnapshotIn extends SnapshotIn<typeof MediaFileModel> {}
