import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Header, Screen, TextField } from "app/components"
import { Button } from "app/components/Button"
import { ImagePicker } from "app/components/ImagePicker"
import SelectTextField from "app/components/SelectTextField"
import { useStores } from "app/models"
import { useProfile } from "app/models/hooks/useProfile"
import { MediaFile, MediaFileModel } from "app/models/media-file/MediaFile"
import { MediaFileType } from "app/models/media-file/MediaFileType"
import { generateUUID } from "app/screens/auth/utils"
import { UK_CITIES } from "app/screens/digital-garage/data/uk-cities"
import { uploadProfile } from "app/screens/digital-garage/screens/dashboard/vehicle-form/api"
import { BackButton } from "app/screens/user/components/BackButton"
import { trpc } from "app/services/api"
import { colors, spacing } from "app/theme"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

const allCities = UK_CITIES.map(({ city }) => city).sort()

export const UserProfileScreen = () => {
  const profile = useProfile()
  const [firstName, setFirstName] = useState(profile?.firstName || "")
  const [lastName, setLastName] = useState(profile?.lastName || "")
  const [city, setCity] = useState(profile?.location || "")
  const [recentStates, setRecentStates] = useState<string[]>(allCities)
  const [profilePicture, setProfilePicture] = useState<MediaFile | null>(
    profile?.displayPicture || null,
  )
  const navigation = useNavigation()

  console.log("PROFILE:", profile)

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
    // const profileMutationResult = await updateProfileMutation.mutateAsync({
    //   firstName,
    //   lastName,
    //   location: city,
    //   displayPicture: profilePicture,
    // })
    const formData = new FormData()
    if (profilePicture) {
      formData.append("displayPicture", {
        uri: profilePicture.url,
        name: profilePicture.fileName,
        type: profilePicture.mimeType,
      })
    }
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("location", city)

    const updateProfileResult = await uploadProfile(formData)
    console.log("updateProfileResult:\n", JSON.stringify(updateProfileResult, null, 2))
    authenticationStore.setAuthUser(updateProfileResult)
    navigation.goBack()
  }

  return (
    <Screen
      safeAreaEdges={["bottom"]}
      preset="scroll"
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        {navigation.canGoBack() && (
          <Header
            title="Profile"
            titleStyle={styles.headerTitle}
            safeAreaEdges={["top"]}
            LeftActionComponent={<BackButton onPress={navigation.goBack} />}
            containerStyle={[
              {
                backgroundColor: "transparent",
                // position: "absolute",
                paddingHorizontal: spacing.md,
                justifyContent: "flex-start",
              },
            ]}
          />
        )}
        <ImagePicker
          size={150}
          value={profilePicture?.url}
          onImageSelected={async (file) => {
            setProfilePicture(
              MediaFileModel.create({
                id: await generateUUID(),
                url: file.uri,
                thumbnailUrl: file.uri,
                type: file.type === "image" ? MediaFileType.IMAGE : MediaFileType.VIDEO,
                fileName: "profile-picture.jpg",
                mimeType: file.mimeType || "image/jpeg",
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
  },
  headerTitle: {
    fontSize: 25,
  },
  photoContainer: {
    marginTop: spacing.xl,
    alignSelf: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
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
