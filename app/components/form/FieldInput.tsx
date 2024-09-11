import { Text, TextField, TextFieldProps, TextProps } from "app/components"
import { colors, spacing } from "app/theme"
import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

export interface FieldInputProps extends TextFieldProps {
  status?: "error" | "disabled"
  label?: TextProps["text"]
  LabelTextProps?: TextProps
  helper?: TextProps["text"]
  HelperTextProps?: TextProps
  containerStyle?: StyleProp<ViewStyle>
  onChange?: (text: string) => void
}

export const FieldInput: React.FC<FieldInputProps> = ({
  status,
  label,
  LabelTextProps,
  helper,
  HelperTextProps,
  containerStyle,
  onChange,
  ...textFieldProps
}) => {
  const $containerStyles = [containerStyle]
  const $labelStyles = [$labelStyle, LabelTextProps?.style]
  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {!!label && <Text preset="formLabel" text={label} {...LabelTextProps} style={$labelStyles} />}

      <TextField {...textFieldProps} onChangeText={onChange} />

      {!!helper && (
        <Text preset="formHelper" text={helper} {...HelperTextProps} style={$helperStyles} />
      )}
    </View>
  )
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.xs,
}
