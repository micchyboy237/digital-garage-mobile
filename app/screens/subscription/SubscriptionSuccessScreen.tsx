import { Button, Screen, Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "app/theme"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

interface SubscriptionSuccessScreenProps extends AppStackScreenProps<"SubscriptionSuccess"> {}

export const SubscriptionSuccessScreen: FC<SubscriptionSuccessScreenProps> = ({ navigation }) => {
  function handleSubmit() {
    navigation.reset({
      index: 0,
      // routes: [{ name: "User" }],
      routes: [{ name: "LoggedIn" }],
    })
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$successMessage}>
          Subscription Successful
        </Text>
        <Text style={$instructions}>
          Your subscription has been successfully activated. You can now enjoy all the premium
          features.
        </Text>
      </View>

      <Button
        testID="go-to-dashboard-button"
        style={$dashboardButton}
        preset="reversed"
        onPress={handleSubmit}
      >
        Go to Dashboard
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

const $dashboardButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#BE0E8DDE",
}
