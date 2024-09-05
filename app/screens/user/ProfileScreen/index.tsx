import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Screen, TextField } from "app/components"
import { Button } from "app/components/Button"
import { ImagePicker } from "app/components/ImagePicker"
import SelectTextField from "app/components/SelectTextField"
import { useStores } from "app/models"
import { useProfile } from "app/models/hooks/useProfile"
import { useUser } from "app/models/hooks/useUser"
import { MediaFile, MediaFileModel } from "app/models/media-file/MediaFile"
import { MediaFileType } from "app/models/media-file/MediaFileType"
import { useLogout } from "app/screens/auth/useLogout"
import { generateUUID } from "app/screens/auth/utils"
import { UK_CITIES } from "app/screens/digital-garage/data/uk-cities"
import { trpc } from "app/services/api"
import { colors, spacing, typography } from "app/theme"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const allCities = UK_CITIES.map(({ city }) => city).sort()

export function ProfileScreen() {
  const logout = useLogout()
  const user = useUser()
  const profile = useProfile()
  const [firstName, setFirstName] = useState(profile?.firstName || "")
  const [lastName, setLastName] = useState(profile?.lastName || "")
  const [city, setCity] = useState(profile?.location || "")
  const [recentStates, setRecentStates] = useState<string[]>(allCities)
  const [profilePicture, setProfilePicture] = useState<MediaFile | null>(
    profile?.displayPicture || null,
  )
  const navigation = useNavigation()

  const { authenticationStore } = useStores()

  function handleSelectCity(selectedCity: string) {
    setCity(selectedCity)
    setRecentStates(() => {
      const updatedStates = allCities.filter((state) => state !== selectedCity)
      return [selectedCity, ...updatedStates]
    })
  }

  const updateProfileMutation = trpc.me.updateProfile.useMutation()

  const handleSubmit = async () => {
    const profileMutationResult = await updateProfileMutation.mutateAsync({
      firstName,
      lastName,
      location: city,
      displayPicture: profilePicture,
    })
    console.log("profileMutationResult:\n", JSON.stringify(profileMutationResult, null, 2))
    authenticationStore.setAuthUser(profileMutationResult)
    navigation.goBack()
  }

  const insets = useSafeAreaInsets()

  return (
    <Screen preset="scroll" contentContainerStyle={styles.contentContainer}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <ImagePicker
          size={180}
          value={profilePicture?.url}
          onImageSelected={async (file) => {
            setProfilePicture(
              MediaFileModel.create({
                id: await generateUUID(),
                url: file.uri,
                thumbnailUrl: file.uri,
                type: file.type === "image" ? MediaFileType.IMAGE : MediaFileType.VIDEO,
                fileName: file.fileName || "photo.jpg",
                mimeType: file.type || "image/jpeg",
              }),
            )
          }}
          containerStyle={styles.photoContainer}
        >
          <View
            pointerEvents="none"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.palette.primary400,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
            onPress={() => {}}
          >
            <Feather name="camera" size={24} color={colors.palette.neutral100} />
          </View>
        </ImagePicker>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <TextField
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={styles.textField}
            autoCapitalize="words"
            autoComplete="name-given"
            autoCorrect={false}
            label="First Name"
            placeholder="Enter your first name"
          />

          <TextField
            value={lastName}
            onChangeText={setLastName}
            containerStyle={styles.textField}
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
            maxItems={5}
            label="City"
            placeholder="Find your city"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          testID="submit-button"
          preset="reversed"
          onPress={handleSubmit}
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
        >
          Save Changes
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: "100%",
    backgroundColor: colors.background,
  },
  header: {
    width: "100%",
    height: 227,
    backgroundColor: colors.palette.primary400,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: typography.primary.semiBold,
    color: colors.palette.neutral100,
  },
  photoContainer: {
    marginTop: spacing.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    marginTop: 80,
  },
  section: {
    gap: spacing.lg,
  },
  footer: {
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  textField: {},
  submitButton: {
    backgroundColor: colors.palette.primary400,
    borderRadius: 6, // Reduced from 8
    paddingVertical: spacing.sm, // Reduced from spacing.md
  },
  submitButtonText: {},
})
