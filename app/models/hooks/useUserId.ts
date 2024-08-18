import { useStores } from "app/models"

export const useUserId = (): string | undefined => {
  const { authenticationStore } = useStores()
  return authenticationStore.authUser?.id
}
