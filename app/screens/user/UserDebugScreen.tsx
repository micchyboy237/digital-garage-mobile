import { useNavigation } from "@react-navigation/native"
import * as Application from "expo-application"
import React, { FC } from "react"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { useStores } from "../../models"
import { UserTabScreenProps } from "../../navigators/UserNavigator"
import { colors, spacing } from "../../theme"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

const translations = {
  howTo: "HOW TO",
  title: "Debug",
  tagLine:
    "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
  reactotron: "Send to Reactotron",
  reportBugs: "Report Bugs",
  demoList: "Demo List",
  demoPodcastList: "Demo Podcast List",
  androidReactotronHint:
    "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
  iosReactotronHint:
    "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  macosReactotronHint:
    "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  webReactotronHint:
    "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  windowsReactotronHint:
    "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
}

export const UserDebugScreen: FC<UserTabScreenProps<"UserDebug">> = function UserDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()
  const navigation = useNavigation()

  const handleLogout = () => {
    logout()
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }

  const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null
  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null

  const userReactotron = React.useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        })
      }
    },
    [],
  )

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text
        style={$reportBugsLink}
        onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite/issues")}
      >
        {translations.reportBugs}
      </Text>
      <Text style={$title} preset="heading">
        {translations.title}
      </Text>
      <View style={$itemsContainer}>
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Id</Text>
              <Text>{Application.applicationId}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Name</Text>
              <Text>{Application.applicationName}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Version</Text>
              <Text>{Application.nativeApplicationVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">App Build Version</Text>
              <Text>{Application.nativeBuildVersion}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Hermes Enabled</Text>
              <Text>{String(usingHermes)}</Text>
            </View>
          }
        />
        <ListItem
          LeftComponent={
            <View style={$item}>
              <Text preset="bold">Fabric Enabled</Text>
              <Text>{String(usingFabric)}</Text>
            </View>
          }
        />
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} onPress={userReactotron}>
          {translations.reactotron}
        </Button>
        <Text style={$hint}>{translations[`${Platform.OS}ReactotronHint` as const]}</Text>
      </View>
      <View style={$buttonContainer}>
        <Button style={$button} onPress={handleLogout}>
          Log Out
        </Button>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxl,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
}

// @user remove-file
