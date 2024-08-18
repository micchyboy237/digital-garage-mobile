import { useNavigation } from "@react-navigation/native"
import { useAuthActions } from "app/screens/auth/useAuthActions"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface ForgotPasswordScreenProps extends AppStackScreenProps<"ForgotPassword"> {}

export const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = function ForgotPasswordScreen(
  _props,
) {
  const [email, setEmail] = useState("")
  const navigation = useNavigation()

  const { forgotPassword } = useAuthActions()

  async function submitRequest(): Promise<void> {
    try {
      await forgotPassword(email)
      navigation.navigate("ForgotPasswordSuccess")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$enterDetails}>
          Forgot Password
        </Text>
      </View>

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder="Enter your email"
      />

      <Button
        testID="submit-request-button"
        style={$submitButton}
        preset="reversed"
        onPress={submitRequest}
      >
        Submit
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

const $submitButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#BE0E8DDE",
}
