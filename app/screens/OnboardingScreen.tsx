// digital-garage/packages/api/src/screens/OnboardingScreen.tsx

import { UK_CITIES } from "app/screens/digital-garage/data/uk-cities"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { ImagePicker } from "../components/ImagePicker"
import { SelectTextField } from "../components/SelectTextField"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

const allCities = UK_CITIES.map(({ city }) => city).sort()

export const OnboardingScreen: FC<OnboardingScreenProps> = function OnboardingScreen({
  navigation,
}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [recentStates, setRecentStates] = useState<string[]>(allCities)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  function submitOnboarding() {
    // Handle onboarding logic here
    navigation.navigate("Subscription") // Replace "NextScreen" with the actual next screen in your app
  }

  function handleSelectCity(selectedCity: string) {
    setCity(selectedCity)
    setRecentStates(() => {
      const updatedStates = allCities.filter((state) => state !== selectedCity)
      return [selectedCity, ...updatedStates]
    })
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$enterDetails}>
          Onboarding
        </Text>
      </View>

      <ImagePicker onImageSelected={setProfilePicture} />

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

      <SelectTextField
        data={recentStates}
        onSelect={handleSelectCity}
        value={city}
        maxItems={5} // Limit the number of items shown
        label="City"
        placeholder="Find your city"
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
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.md,
}

const $submitButton: ViewStyle = {
  marginTop: spacing.md,
}
