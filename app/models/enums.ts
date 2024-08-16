import { types } from "mobx-state-tree"

export const PaymentIntervalEnum = types.enumeration("PaymentInterval", ["monthly"])
export const SubscriptionStatusEnum = types.enumeration("SubscriptionStatus", [
  "active",
  "cancelled",
  "paused",
])
export const EventTypeEnum = types.enumeration("EventType", [
  "post",
  "reminder",
  "invoice",
  "document",
])
export const DocumentTypeEnum = types.enumeration("DocumentType", ["general", "photo"])
export const MediaFileTypeEnum = types.enumeration("MediaFileType", ["photo", "video", "document"])
export const UserRoleEnum = types.enumeration("UserRole", ["admin", "user"])
