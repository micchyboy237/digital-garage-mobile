// digital-garage/packages/api/src/screens/OnboardingScreen.tsx

import { useStores } from "app/models"
import { useProfile } from "app/models/hooks/useProfile"
import { useUserId } from "app/models/hooks/useUserId"
import { fetchExistingProfile } from "app/screens/auth/sign-up/api"
import { UK_CITIES } from "app/screens/digital-garage/data/uk-cities"
import { trpc } from "app/services/api"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { ImagePicker } from "../components/ImagePicker"
import { SelectTextField } from "../components/SelectTextField"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

const allCities = UK_CITIES.map(({ city }) => city).sort()

export const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
  const profile = useProfile()
  console.log("PROFILE:\n", JSON.stringify(profile, null, 2))
  const [firstName, setFirstName] = useState(profile?.firstName || "")
  const [lastName, setLastName] = useState(profile?.lastName || "")
  const [city, setCity] = useState(profile?.location || "")
  const [recentStates, setRecentStates] = useState<string[]>(allCities)
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profile?.profilePicture || null,
  )

  const { authenticationStore } = useStores()
  const userId = useUserId()
  const createProfileMutation = trpc.admin.profile.createOneProfile.useMutation()
  const updateProfileMutation = trpc.admin.profile.updateOneProfile.useMutation()

  const updateUserMutation = trpc.admin.user.updateOneUser.useMutation()

  async function submitOnboarding() {
    const existingProfile = await fetchExistingProfile(userId)
    const profileMutation = existingProfile ? updateProfileMutation : createProfileMutation
    const profileMutationResult = await profileMutation.mutateAsync({
      data: {
        firstName,
        lastName,
        location: city,
        profilePicture,
        userId,
      },
      where: {
        userId,
      },
    })
    authenticationStore.setAuthProfile(profileMutationResult)

    const userMutationResult = await updateUserMutation.mutateAsync({
      data: {
        accountStatus: "SELECT_SUBSCRIPTION",
      },
      where: {
        id: userId,
      },
    })

    if (userMutationResult) {
      authenticationStore.setAuthUser(userMutationResult)
    }

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
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View>
        <Text preset="subheading" style={$enterDetails}>
          Onboarding
        </Text>
      </View>

      <ImagePicker onImageSelected={setProfilePicture} value={profilePicture} />

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
