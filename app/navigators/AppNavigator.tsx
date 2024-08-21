/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { useGetInitialRoute } from "app/models/hooks/useGetInitialRoute"
import { LoggedInNavigator, LoggedInStackParamList } from "app/navigators/LoggedInNavigator"
import * as Screens from "app/screens"
import { SignUpSuccessScreen } from "app/screens/auth/sign-up/SignUpSuccessScreen"
import { ForgotPasswordScreen } from "app/screens/ForgotPasswordScreen"
import { ForgotPasswordSuccessScreen } from "app/screens/ForgotPasswordSuccessScreen"
import { ResetPasswordScreen } from "app/screens/ResetPasswordScreen"
import { ResetPasswordSuccessScreen } from "app/screens/ResetPasswordSuccessScreen"
import { colors } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  LoggedIn: NavigatorScreenParams<LoggedInStackParamList>
  // 🔥 Your screens go here
  SignUp: undefined
  ForgotPassword: undefined
  ResetPassword: undefined
  SignUpSuccess: undefined
  ForgotPasswordSuccess: undefined
  ResetPasswordSuccess: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const initialRoute = useGetInitialRoute()

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      // initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
      initialRouteName={initialRoute}
      // initialRouteName={isAuthenticated ? "Onboarding" : "Login"}
      // initialRouteName="Subscription"
    >
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
      <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="SignUpSuccess" component={SignUpSuccessScreen} />
      <Stack.Screen name="ForgotPasswordSuccess" component={ForgotPasswordSuccessScreen} />
      <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccessScreen} />
      <Stack.Screen name="LoggedIn" component={LoggedInNavigator} />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
