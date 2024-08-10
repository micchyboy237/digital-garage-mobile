import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

export const OnboardingScreen: FC<OnboardingScreenProps> = function OnboardingScreen({
  navigation,
}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  function submitOnboarding() {
    // Handle onboarding logic here
    navigation.navigate("Subscription") // Replace "NextScreen" with the actual next screen in your app
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$enterDetails}>
          Onboarding
        </Text>
      </View>

      <TextField
        value={firstName}
        onChangeText={setFirstName}
        containerStyle={$textField}
        autoCapitalize="words"
        autoComplete="name-given"
        autoCorrect={false}
        label="First Name"
        placeholder="Enter your first name"
      />

      <TextField
        value={lastName}
        onChangeText={setLastName}
        containerStyle={$textField}
        autoCapitalize="words"
        autoComplete="name-family"
        autoCorrect={false}
        label="Last Name"
        placeholder="Enter your last name"
      />

      <Button
        testID="submit-onboarding-button"
        style={$submitButton}
        preset="reversed"
        onPress={submitOnboarding}
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
