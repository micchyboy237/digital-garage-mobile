import { useNavigation, useRoute } from "@react-navigation/native"
import { useAuthActions } from "app/screens/auth/useAuthActions"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface ResetPasswordScreenProps extends AppStackScreenProps<"ResetPassword"> {}

export const ResetPasswordScreen: FC<ResetPasswordScreenProps> = function ResetPasswordScreen(
  _props,
) {
  const [newPassword, setNewPassword] = useState("")

  const navigation = useNavigation()
  const route = useRoute()

  const code = route.params?.code
  console.log("CODE:", code)

  const { resetPassword } = useAuthActions()

  async function submitRequest(): Promise<void> {
    try {
      await resetPassword(code, newPassword)
      navigation.navigate("ResetPasswordSuccess")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$enterDetails}>
          Reset Password
        </Text>
      </View>

      <TextField
        value={newPassword}
        onChangeText={setNewPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        label="New Password"
        placeholder="Enter your new password"
      />

      <Button
        testID="reset-password-button"
        style={$resetButton}
        preset="reversed"
        onPress={submitRequest}
      >
        Reset Password
      </Button>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $resetButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#BE0E8DDE",
}
