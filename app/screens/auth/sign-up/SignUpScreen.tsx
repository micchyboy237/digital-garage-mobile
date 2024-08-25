import { useStores } from "app/models"
import { AuthEmailPwButton } from "app/screens/auth/sign-up/SignUpButtons"
import { SignInButton } from "app/screens/auth/SignInButton"
import { useAppleAuth } from "app/screens/auth/useAppleAuth"
import { useGoogleAuth } from "app/screens/auth/useGoogleAuth"
import { BackButton } from "app/screens/user/components/BackButton"
import React, { FC, useState } from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { Header, Screen, Text, TextField, Toggle } from "../../../components"
import { AppStackScreenProps } from "../../../navigators"
import { colors, spacing } from "../../../theme"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

const logoWithText = require("../../../../assets/app-icons/classic-garage.png")

export const SignUpScreen: FC<SignUpScreenProps> = function SignUpScreen(_props) {
  const [email, setEmail] = useState("micchyboy.developer@gmail.com")
  const [password, setPassword] = useState("asdasd!123")
  const [isTermsAccepted, setIsTermsAccepted] = useState(true)

  const { authenticationStore } = useStores()

  const appleAuth = useAppleAuth({
    onSignIn: (state) => {
      console.log("Apple sign in successful:", state)
      authenticationStore.setAuthUser(state.user)
      authenticationStore.setAuthSession(state.session)
    },
    onSignOut: (user) => {
      console.log("Apple sign out successful:", user)
    },
  })

  const googleAuth = useGoogleAuth({
    onSignIn: (state) => {
      console.log("Google sign in successful:", state)
      authenticationStore.setAuthUser(state.user)
      authenticationStore.setAuthSession(state.session)
    },
    onSignOut: (user) => {
      console.log("Google sign out successful:", user)
    },
  })

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      {_props.navigation.canGoBack() && (
        <Header
          safeAreaEdges={[]}
          LeftActionComponent={<BackButton onPress={_props.navigation.goBack} />}
        />
      )}

      <View style={$body}>
        <View>
          <Image
            source={logoWithText}
            style={{ width: 207, height: 108, alignSelf: "center", marginBottom: 20 }}
          />

          <Text preset="subheading" style={$enterDetails}>
            Sign up for a free 14-day trial to start your Digital Garage journey.
          </Text>
        </View>

        <View>
          <TextField
            value={email}
            onChangeText={setEmail}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            label="Email"
            placeholder="Enter your email"
          />
          <TextField
            value={password}
            onChangeText={setPassword}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={true}
            label="Password"
            placeholder="Enter your password"
          />
        </View>
        <View>
          <Toggle
            containerStyle={$checkboxContainer}
            value={isTermsAccepted}
            onValueChange={setIsTermsAccepted}
            variant="checkbox"
            label={
              <Text>
                By registering for Digital Garage, I agree to the{" "}
                <Text
                  onPress={() => alert("Terms of Service")}
                  style={{
                    color: "#BE0E8DDE",
                  }}
                >
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text
                  onPress={() => alert("Privacy Policy")}
                  style={{
                    color: "#BE0E8DDE",
                  }}
                >
                  Privacy Policy
                </Text>
              </Text>
            }
            labelStyle={$checkboxText}
          />
          <AuthEmailPwButton email={email} password={password} isTermsAccepted={isTermsAccepted} />
        </View>
      </View>

      <View style={$footer}>
        <View style={$socialButtonContainer}>
          <SignInButton
            style={$socialButton}
            textStyle={$socialButtonText}
            type="apple"
            onPress={appleAuth.signInAsync}
          />
          <SignInButton
            style={$socialButton}
            textStyle={$socialButtonText}
            type="google"
            onPress={googleAuth.signInAsync}
          />
        </View>
      </View>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-around",
  paddingHorizontal: spacing.lg,
}

const $body: ViewStyle = {
  flex: 3,
  justifyContent: "center",
}

const $footer: ViewStyle = {
  flex: 1,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $checkboxContainer: ViewStyle = {
  marginBottom: spacing.lg,
}

const $checkboxText: TextStyle = {
  marginLeft: spacing.sm,
  color: colors.palette.neutral800,
}

const $emailButton: ViewStyle = {
  marginTop: spacing.xs,
  marginBottom: spacing.sm,
  backgroundColor: "#BE0E8DDE",
}

const $socialButtonContainer: ViewStyle = {}

const $socialButton: ViewStyle = {
  // flex: 1,
  justifyContent: "center",
}

const $socialButtonText: TextStyle = {
  fontSize: 16,
}
