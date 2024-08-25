import { useIsAuthenticated } from "app/models/hooks/useIsAuthenticated"
import { AppStackParamList } from "app/navigators"

export const useGetInitialRoute = (): keyof AppStackParamList => {
  const isAuthenticated = useIsAuthenticated()
  console.log("IS AUTHENTICATED:", isAuthenticated)
  let initialRoute: keyof AppStackParamList = "Login"
  if (isAuthenticated) {
    initialRoute = "LoggedIn"
  }

  return initialRoute
}
