import { NavigatorScreenParams, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useGetInitialRoute } from "app/models/hooks/useGetInitialRoute"
import { UserTabParamList } from "app/navigators/UserNavigator"
import { useEffect } from "react"
import Config from "../config"

export type LoggedInStackParamList = {
  User: NavigatorScreenParams<UserTabParamList>
  Onboarding: undefined
  Subscription: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof LoggedInStackParamList> = NativeStackScreenProps<
  LoggedInStackParamList,
  T
>

const Stack = createNativeStackNavigator<LoggedInStackParamList>()

export const LoggedInNavigator = () => {
  const initialRoute = useGetInitialRoute()
  const navigation = useNavigation()

  console.log("LoggedInNavigator:", initialRoute)
  useEffect(() => {
    if (initialRoute) {
      navigation.reset({
        index: 0,
        routes: [{ name: initialRoute }],
      })
    }
  }, [initialRoute])

  return null
}
