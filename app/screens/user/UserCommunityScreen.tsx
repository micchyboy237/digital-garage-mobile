import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { UserTabScreenProps } from "../../navigators/UserNavigator"
import { spacing } from "../../theme"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

const chainReactLogo = require("../../../assets/images/demo/cr-logo.png")
const reactNativeLiveLogo = require("../../../assets/images/demo/rnl-logo.png")
const reactNativeRadioLogo = require("../../../assets/images/demo/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../../assets/images/demo/rnn-logo.png")

const translations = {
  title: "Connect with the community",
  tagLine:
    "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
  joinUsOnSlackTitle: "Join us on Slack",
  joinUsOnSlack:
    "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
  joinSlackLink: "Join the Slack Community",
  makeIgniteEvenBetterTitle: "Make Ignite even better",
  makeIgniteEvenBetter:
    "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
  contributeToIgniteLink: "Contribute to Ignite",
  theLatestInReactNativeTitle: "The latest in React Native",
  theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
  reactNativeRadioLink: "React Native Radio",
  reactNativeNewsletterLink: "React Native Newsletter",
  reactNativeLiveLink: "React Native Live",
  chainReactConferenceLink: "Chain React Conference",
  hireUsTitle: "Hire Infinite Red for your next project",
  hireUs:
    "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
  hireUsLink: "Send us a message",
}

export const UserCommunityScreen: FC<UserTabScreenProps<"UserCommunity">> =
  function UserCommunityScreen(_props) {
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" style={$title}>
          {translations.title}
        </Text>
        <Text style={$tagline}>{translations.tagLine}</Text>

        <Text preset="subheading">{translations.joinUsOnSlackTitle}</Text>
        <Text style={$description}>{translations.joinUsOnSlack}</Text>
        <ListItem
          text={translations.joinSlackLink}
          leftIcon="slack"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://community.infinite.red/")}
        />
        <Text preset="subheading" style={$sectionTitle}>
          {translations.makeIgniteEvenBetterTitle}
        </Text>
        <Text style={$description}>{translations.makeIgniteEvenBetter}</Text>
        <ListItem
          text={translations.contributeToIgniteLink}
          leftIcon="github"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
        />

        <Text preset="subheading" style={$sectionTitle}>
          {translations.theLatestInReactNativeTitle}
        </Text>
        <Text style={$description}>{translations.theLatestInReactNative}</Text>
        <ListItem
          text={translations.reactNativeRadioLink}
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={reactNativeRadioLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
        />
        <ListItem
          text={translations.reactNativeNewsletterLink}
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={reactNativeNewsletterLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
        />
        <ListItem
          text={translations.reactNativeLiveLink}
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={reactNativeLiveLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://rn.live/")}
        />
        <ListItem
          text={translations.chainReactConferenceLink}
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
        />
        <Text preset="subheading" style={$sectionTitle}>
          {translations.hireUsTitle}
        </Text>
        <Text style={$description}>{translations.hireUs}</Text>
        <ListItem
          text={translations.hireUsLink}
          leftIcon="clap"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://infinite.red/contact")}
        />
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
}

const $description: TextStyle = {
  marginBottom: spacing.lg,
}

const $sectionTitle: TextStyle = {
  marginTop: spacing.xxl,
}

const $logoContainer: ViewStyle = {
  marginEnd: spacing.md,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
  alignSelf: "stretch",
}

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

// @user remove-file
