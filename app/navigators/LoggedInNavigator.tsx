import { NavigatorScreenParams, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useGetInitialLoggedInRoute } from "app/models/hooks/useGetInitialLoggedInRoute"
import { UserNavigator, UserTabParamList } from "app/navigators/UserNavigator"
import { DashboardScreen, VehicleDetailsScreen, WelcomeScreen } from "app/screens"
import { useLoggedInBootstrap } from "app/screens/digital-garage/hooks/useLoggedInBootstrap"
import { OnboardingScreen } from "app/screens/OnboardingScreen"
import { SubscriptionScreen } from "app/screens/SubscriptionScreen"
import { CarDetailsScreen } from "app/screens/user/CarDetailsScreen"
import { colors } from "app/theme"
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
  const { isReady } = useLoggedInBootstrap()
  const initialRoute = useGetInitialLoggedInRoute()
  const navigation = useNavigation()

  useEffect(() => {
    if (isReady && initialRoute) {
      navigation.reset({
        index: 0,
        routes: [{ name: initialRoute }],
      })
    }
  }, [initialRoute])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      // initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
      initialRouteName={initialRoute}
      // initialRouteName={isAuthenticated ? "Onboarding" : "Login"}
      // initialRouteName="Subscription"
    >
      <Stack.Screen name="User" component={UserNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      {/* @demo remove-block-end */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/* @demo remove-block-start */}
      {/* <Stack.Screen name="Demo" component={DemoNavigator} /> */}
    </Stack.Navigator>
  )
}
