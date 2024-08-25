import { MaterialIcons } from "@expo/vector-icons"
import { colors, spacing } from "app/theme"
import React from "react"
import { ViewStyle } from "react-native"
import { BorderlessButton, BorderlessButtonProps } from "react-native-gesture-handler"

interface Props extends BorderlessButtonProps {
  color?: string
  size?: number
}

export function BackButton({ color, size = 34, ...rest }: Props) {
  return (
    <BorderlessButton
      {...rest}
      style={[
        $borderButton,
        {
          left: -spacing.md / 2,
        },
        rest.style,
      ]}
    >
      <MaterialIcons name="chevron-left" size={size} color={color || colors.text} />
    </BorderlessButton>
  )
}

const $borderButton = {
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle
