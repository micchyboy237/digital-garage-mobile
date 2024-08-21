import { useNavigation } from "@react-navigation/native"
import { useIsAuthenticated } from "app/models/hooks/useIsAuthenticated"
import { AppStackParamList } from "app/navigators"
import { useEffect } from "react"

export const useGetInitialRoute = (): keyof AppStackParamList => {
  const isAuthenticated = useIsAuthenticated()
  const navigation = useNavigation()
  console.log("IS AUTHENTICATED:", isAuthenticated)
  let initialRoute: keyof AppStackParamList = "Login"
  if (isAuthenticated) {
    initialRoute = "LoggedIn"
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    }
  }, [isAuthenticated])

  return initialRoute
}
