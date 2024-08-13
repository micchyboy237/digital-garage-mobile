import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "app/theme"
import React from "react"
import { BorderlessButton, BorderlessButtonProps } from "react-native-gesture-handler"

interface Props extends BorderlessButtonProps {
  color?: string
}

export function BackButton({ color, ...rest }: Props) {
  return (
    <BorderlessButton {...rest}>
      <MaterialIcons name="chevron-left" size={24} color={color || colors.text} />
    </BorderlessButton>
  )
}
