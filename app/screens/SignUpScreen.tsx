import { FontAwesome } from "@expo/vector-icons"
import { useAuthActions } from "app/screens/auth/useAuthActions"
import { useEmailPasswordAuth } from "app/screens/auth/useEmailPasswordAuth"
import React, { FC, useState } from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField, Toggle } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

const logo = require("../../assets/images/logo.png")

export const SignUpScreen: FC<SignUpScreenProps> = function SignUpScreen(_props) {
  const [email, setEmail] = useState("micchyboy.developer@gmail.com")
  const [password, setPassword] = useState("asdasd!123")
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const emailpwAuth = useEmailPasswordAuth()
  const { sendVerificationEmail } = useAuthActions()

  async function signUp() {
    if (!isTermsAccepted) {
      alert("You must agree to the Terms of Service and Privacy Policy")
      return
    }

    const result = await emailpwAuth.registerAsync(email, password)
    console.log("signUp result", result)
    await sendVerificationEmail()
    console.log("Verification email sent to", email)

    // _props.navigation.navigate("Onboarding")
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Image
          source={logo}
          style={{ width: 80, height: 80, alignSelf: "center", marginBottom: 20 }}
        />

        <Text preset="subheading" style={$enterDetails}>
          Sign up for a free 7-day trial to start your Digital Garage journey.
        </Text>
      </View>

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

      <Button testID="sign-up-button" style={$signUpButton} preset="reversed" onPress={signUp}>
        Sign Up
      </Button>

      <TouchableOpacity
        style={$appleButton}
        onPress={() => {
          // Handle Apple sign-in
        }}
      >
        <FontAwesome name="apple" size={24} color="white" />
        <Text style={$appleButtonText}>Sign up with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={$googleButton}
        onPress={() => {
          // Handle Google sign-in
        }}
      >
        <FontAwesome name="google" size={24} color="black" />
        <Text style={$googleButtonText}>Sign up with Google</Text>
      </TouchableOpacity>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
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

const $signUpButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#BE0E8DDE",
}

const $appleButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  padding: spacing.md,
  borderRadius: 4,
  marginTop: spacing.md,
}

const $appleButtonText: TextStyle = {
  color: "white",
  marginLeft: spacing.sm,
}

const $googleButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  padding: spacing.md,
  borderRadius: 4,
  marginTop: spacing.md,
  borderWidth: 1,
  borderColor: colors.palette.neutral800,
}

const $googleButtonText: TextStyle = {
  color: colors.palette.neutral800,
  marginLeft: spacing.sm,
}
