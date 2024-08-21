import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "app/theme"
import React from "react"
import { ViewStyle } from "react-native"
import { BorderlessButton, BorderlessButtonProps } from "react-native-gesture-handler"

interface Props extends BorderlessButtonProps {
  color?: string
}

export function BackButton({ color, ...rest }: Props) {
  return (
    <BorderlessButton {...rest} style={[$borderButton, rest.style]}>
      <MaterialIcons name="chevron-left" size={28} color={color || colors.text} />
    </BorderlessButton>
  )
}

const $borderButton = {
  width: 40,
  height: 40,
  left: -6,
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle
