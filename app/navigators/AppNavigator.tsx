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
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { LoggedInNavigator, LoggedInStackParamList } from "app/navigators/LoggedInNavigator"
import { UserNavigator } from "app/navigators/UserNavigator"
import * as Screens from "app/screens"
import { useAuthStateChanged } from "app/screens/auth/useAuthStateChanged"
import { ForgotPasswordScreen } from "app/screens/ForgotPasswordScreen"
import { ForgotPasswordSuccessScreen } from "app/screens/ForgotPasswordSuccessScreen"
import { OnboardingScreen } from "app/screens/OnboardingScreen"
import { ResetPasswordScreen } from "app/screens/ResetPasswordScreen"
import { ResetPasswordSuccessScreen } from "app/screens/ResetPasswordSuccessScreen"
import { SubscriptionScreen } from "app/screens/SubscriptionScreen"
import { CarDetailsScreen } from "app/screens/user/UserCarsScreen/CarDetails"
import { colors } from "app/theme"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
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
  ForgotPasswordSuccess: undefined
  ResetPasswordSuccess: undefined
  Onboarding: undefined
  Subscription: undefined
  User: undefined
  Dashboard: undefined
  VehicleDetails: undefined
  CarDetails: undefined
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
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  // Use the custom useAuth hook
  const authObj = useAuthStateChanged({
    onAuthStateChanged: (state) => {
      console.log("Firebase auth state changed:", state)
    },
  })

  if (authObj.initializing) {
    // Optionally show a loading screen while initializing
    return null
  }

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      // initialRouteName={isAuthenticated ? "Welcome" : "Login"} // @demo remove-current-line
      initialRouteName={isAuthenticated ? "LoggedIn" : "Login"}
      // initialRouteName={isAuthenticated ? "Onboarding" : "Login"}
      // initialRouteName="Subscription"
    >
      {/* @demo remove-block-start */}
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="LoggedIn"
            component={LoggedInNavigator}
            options={{
              animation: "none",
            }}
          />
          <Stack.Screen name="User" component={UserNavigator} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
          <Stack.Screen name="Dashboard" component={Screens.DashboardScreen} />
          <Stack.Screen name="VehicleDetails" component={Screens.VehicleDetailsScreen} />
          {/* @demo remove-block-end */}
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          {/* @demo remove-block-start */}
          {/* <Stack.Screen name="Demo" component={DemoNavigator} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="ForgotPasswordSuccess" component={ForgotPasswordSuccessScreen} />
          <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccessScreen} />
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
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
