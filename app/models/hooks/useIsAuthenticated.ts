import { useStores } from "app/models"

export const useIsAuthenticated = (): boolean => {
  const { authenticationStore } = useStores()
  return authenticationStore.isAuthenticated
}
