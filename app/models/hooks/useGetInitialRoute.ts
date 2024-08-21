import { useIsAuthenticated } from "app/models/hooks/useIsAuthenticated"

export const useGetInitialRoute = (): string | undefined => {
  const isAuthenticated = useIsAuthenticated()
  let initialRoute = "Login"
  if (isAuthenticated) {
    initialRoute = "LoggedIn"
  }
  return initialRoute
}
