import { Button, Screen, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "app/theme"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

interface SignUpSuccessScreenProps extends AppStackScreenProps<"SignUpSuccess"> {}

export const SignUpSuccessScreen: FC<SignUpSuccessScreenProps> = function SignUpSuccessScreen({
  navigation,
}) {
  function goToLogin() {
    navigation.replace("Login")
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$successMessage}>
          Verification Email Sent
        </Text>
        <Text style={$instructions}>
          A verification link has been sent to your email. Please check your inbox and follow the
          instructions to verify your account.
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
