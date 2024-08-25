import { useStores } from "app/models"
import { Profile } from "app/models/profile/Profile"

export const useProfile = (): Profile | undefined => {
  const { authenticationStore } = useStores()
  return authenticationStore.authProfile
}
