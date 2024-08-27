import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { HomeScreen } from "app/screens/user/HomeScreen"
import { UserCarsScreen } from "app/screens/user/UserCarsScreen"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { DashboardScreen, UserFeaturesScreen, UserSettingsScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type UserTabParamList = {
  UserCommunity: undefined
  Home: undefined
  UserSettings: undefined
  UserPodcastList: undefined
  UserFeatures: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type UserTabScreenProps<T extends keyof UserTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<UserTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<UserTabParamList>()

/**
 * This is the main navigator for the user screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `UserNavigator`.
 */
export function UserNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        // component={HomeScreen}
        component={UserCarsScreen}
        options={{
          tabBarLabel: "Garage",
          tabBarActiveTintColor: colors.palette.primary400,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="tabHomeGarage"
              color={focused ? colors.palette.primary400 : undefined}
              size={30}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="UserCars"
        component={UserCarsScreen}
        options={{
          tabBarLabel: "Garage",
          tabBarActiveTintColor: colors.palette.primary400,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="tabHomeGarage"
              color={focused ? colors.palette.primary400 : undefined}
              size={30}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="UserPodcastList"
        // component={UserPodcastListScreen}
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: "For Sale",
          tabBarLabel: "For Sale",
          tabBarActiveTintColor: colors.palette.primary400,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="tabCurrencyPound"
              color={focused ? colors.palette.primary400 : undefined}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="UserFeatures"
        component={UserFeaturesScreen}
        options={{
          tabBarLabel: "Events",
          tabBarActiveTintColor: colors.palette.primary400,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="tabMostlyCloudy"
              color={focused ? colors.palette.primary400 : undefined}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="UserCommunity"
        // component={UserCommunityScreen}
        component={DashboardScreen}
        options={{
          tabBarLabel: "Community",
          tabBarActiveTintColor: colors.palette.primary400,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="tabEvents"
              color={focused ? colors.palette.primary400 : undefined}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="UserSettings"
        component={UserSettingsScreen}
        // component={DemoShowroomScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarActiveTintColor: colors.palette.primary400,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="settings"
              color={focused ? colors.palette.primary400 : undefined}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
