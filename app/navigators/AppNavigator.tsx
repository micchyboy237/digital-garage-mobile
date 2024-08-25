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
import { DemoTabParamList } from "./DemoNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  LoggedIn: NavigatorScreenParams<LoggedInStackParamList>
  SignUp: undefined
  ForgotPassword: undefined
  ResetPassword: undefined
  SignUpSuccess: undefined
  ForgotPasswordSuccess: undefined
  ResetPasswordSuccess: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const initialRoute = useGetInitialRoute()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={initialRoute}
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
