import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface ForgotPasswordSuccessScreenProps extends AppStackScreenProps<"ForgotPasswordSuccess"> {}

export const ForgotPasswordSuccessScreen: FC<ForgotPasswordSuccessScreenProps> =
  function ForgotPasswordSuccessScreen({ navigation }) {
    function goToLogin() {
      navigation.navigate("Login")
    }

    return (
      <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
        <View>
          <Text preset="subheading" style={$successMessage}>
            Password Reset Email Sent
          </Text>
          <Text style={$instructions}>
            Please check your email for instructions to reset your password.
          </Text>
        </View>

        <Button
          testID="go-to-login-button"
          style={$loginButton}
          preset="reversed"
          onPress={goToLogin}
        >
          Go to Login
        </Button>
      </Screen>
    )
  }

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $successMessage: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
  fontSize: 24,
  fontWeight: "bold",
}

const $instructions: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
  fontSize: 16,
}

const $loginButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#BE0E8DDE",
}
