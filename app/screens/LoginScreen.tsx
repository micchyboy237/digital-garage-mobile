import { useNavigation } from "@react-navigation/native"
import { SignInButton } from "app/screens/auth/SignInButton"
import { useAppleAuth } from "app/screens/auth/useAppleAuth"
import { useEmailPasswordAuth } from "app/screens/auth/useEmailPasswordAuth"
import { useGoogleAuth } from "app/screens/auth/useGoogleAuth"
import { trpc } from "app/services/api"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { Image, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
  Toggle,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const logo = require("../../assets/images/logo.png")

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const navigation = useNavigation()
  const authPasswordInput = useRef<TextInput>(null)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const { authenticationStore } = useStores()

  const emailpwAuth = useEmailPasswordAuth({
    onSignIn: (state) => {
      console.log("Email/Password sign in successful:", state)
      authenticationStore.setAuthUser(state.user)
      authenticationStore.setAuthSession(state.session)
    },
    onSignOut: (user) => {
      console.log("Email/Password sign out successful:", user)
    },
  })

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

  // useEffect(() => {
  //   signOutAsync()
  // }, [])

  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  const mutation = trpc.oldAuth.login.useMutation({
    onSuccess: (data) => {
      console.log("login success:", data)
      // setAuthToken(data.accessToken)
    },
  })

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("micchyboy.developer@gmail.com")
    setAuthPassword("asdasd!123")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      // setAuthEmail("")
    }
  }, [])

  useEffect(() => {
    if (mutation.isSuccess) {
      const response = mutation.data
    }
  }, [mutation.isSuccess])

  // const error = isSubmitted ? validationError : ""

  async function handleLogin() {
    emailpwAuth.signInAsync(authEmail, authPassword)
    // mutation.mutate({ email: authEmail, password: authPassword })
    // setIsSubmitted(true)
    // setAttemptsCount(attemptsCount + 1)

    // if (validationError) return

    // // Make a request to your server to get an authentication token.
    // // If successful, reset the fields and set the token.
    // setIsSubmitted(false)
    // setAuthPassword("")
    // // setAuthEmail("")

    // // We'll mock this with a fake token.
    // setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  console.log("emailpwAuth.error", typeof emailpwAuth.error, JSON.stringify(emailpwAuth.error))

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Image
          source={logo}
          style={{ width: 80, height: 80, alignSelf: "center", marginBottom: 20 }}
        />

        <Text preset="subheading" style={$enterDetails}>
          Welcome to Digital Garage
        </Text>
      </View>

      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        // helper={error}
        // status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={handleLogin}
        RightAccessory={PasswordRightAccessory}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: spacing.lg,
        }}
      >
        <Toggle
          containerStyle={$checkboxContainer}
          value={isTermsAccepted}
          onValueChange={setIsTermsAccepted}
          variant="checkbox"
          label={<Text style={$checkboxText}>Remember me</Text>}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword")
          }}
        >
          <Text style={$forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {emailpwAuth.error && (
        <>
          <Text
            style={{
              color: colors.error,
              marginBottom: spacing.sm,
              textAlign: "center",
            }}
          >
            {emailpwAuth.error.message}
          </Text>
        </>
      )}

      <Button testID="login-button" style={$logIn} preset="reversed" onPress={handleLogin}>
        Log In
      </Button>

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

      <Text style={$signUpPrompt}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp")
        }}
      >
        <Text style={$signUpButton}>Sign up</Text>
      </TouchableOpacity>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $logIn: ViewStyle = {
  marginTop: spacing.xs,
  marginBottom: spacing.sm,
  backgroundColor: "#BE0E8DDE",
}

const $checkboxContainer: ViewStyle = {
  flex: 1,
}

const $checkboxText: TextStyle = {
  fontSize: 16,
  color: colors.palette.neutral800,
}

const $forgotPasswordText: TextStyle = {
  fontSize: 16,
  color: "#BE0E8DDE",
  fontWeight: "bold",
}

const $socialButtonContainer: ViewStyle = {
  // flexDirection: "row",
  // justifyContent: "space-between",
  // gap: spacing.sm,
}

const $socialButton: ViewStyle = {
  // flex: 1,
  justifyContent: "center",
}

const $socialButtonText: TextStyle = {
  fontSize: 16,
}

const $signUpPrompt: TextStyle = {
  marginTop: spacing.xxl,
  textAlign: "center",
  color: colors.palette.neutral800,
}

const $signUpButton: TextStyle = {
  textAlign: "center",
  color: "#BE0E8DDE",
  fontWeight: "bold",
}
