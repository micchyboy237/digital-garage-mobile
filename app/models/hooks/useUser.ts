import { useStores } from "app/models"
import { User } from "app/models/user/User"

export const useUser = (): User | undefined => {
  const { authenticationStore } = useStores()
  return authenticationStore.authUser
}
