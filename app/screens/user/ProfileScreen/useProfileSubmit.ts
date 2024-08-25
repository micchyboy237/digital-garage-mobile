import { useStores } from "app/models"
import { useUser } from "app/models/hooks/useUser"
import { trpc } from "app/services/api"
import { Alert } from "react-native"

interface SubmitArgs {
  firstName: string
  lastName: string
  location: string
  profilePicture: string | null
}

export const useProfileSubmit = (): ((args: SubmitArgs) => Promise<void>) => {
  const { authenticationStore } = useStores()
  const user = useUser()
  const updateProfileMutation = trpc.admin.profile.updateOneProfile.useMutation()

  const handleSubmit = async (args: SubmitArgs): Promise<void> => {
    try {
      const profileMutationResult = await updateProfileMutation.mutateAsync({
        data: {
          ...args,
          userId: user.id,
        },
        where: {
          userId: user.id,
        },
      })
      console.log("profileMutationResult:\n", JSON.stringify(profileMutationResult, null, 2))
      authenticationStore.setAuthProfile(profileMutationResult)
      Alert.alert("Profile updated")
    } catch (error) {
      Alert.alert("Unable to update profile", error.message)
    }
  }

  return handleSubmit
}
