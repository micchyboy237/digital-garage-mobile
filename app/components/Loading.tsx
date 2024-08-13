import { colors } from "app/theme"
import React from "react"
import { ActivityIndicator } from "react-native"

export function Loading() {
  return <ActivityIndicator color={colors.palette.neutral300} size="large" style={{ flex: 1 }} />
}
