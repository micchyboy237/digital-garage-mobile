import { useNavigation } from "@react-navigation/native"
import { Session } from "app/models/session/Session"
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

  const emailpwAuth = useEmailPasswordAuth()
  const appleAuth = useAppleAuth()
  const googleAuth = useGoogleAuth()
  const signUpMutation = trpc.user.updateOneUser.useMutation()
  const sessionMutation = trpc.session.updateOneSession.useMutation()

  // useEffect(() => {
  //   signOutAsync()
  // }, [])

  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

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

  // const error = isSubmitted ? validationError : ""

  async function handleLogin() {
    console.log("handleLogin", authEmail, authPassword)
    const result = await emailpwAuth.signInAsync(authEmail, authPassword)
    console.log("signInAsync result:", result)
    const signUpMutationResult = await signUpMutation.mutateAsync({
      data: result.user,
      include: { sessions: true },
      where: { firebaseUid: result.user?.firebaseUid },
    })
    console.log("signUpMutationResult:", JSON.stringify(signUpMutationResult, null, 2))
    const existingSession = signUpMutationResult.sessions.find(
      (session: Session) => session.userId === result.session?.userId,
    )
    console.log("existingSession:", JSON.stringify(existingSession, null, 2))
    const sessionMutationResult = await sessionMutation.mutateAsync({
      data: {
        ...existingSession,
        ...result.session,
      },
      include: { user: true },
      where: { id: existingSession.id },
    })
    console.log("sessionMutationResult:", JSON.stringify(sessionMutationResult, null, 2))

    if (signUpMutationResult) {
      const { sessions, ...userNoSessions } = signUpMutationResult
      console.log("userNoSessions:", JSON.stringify(userNoSessions, null, 2))
      authenticationStore.setAuthUser(userNoSessions)
    }
    if (sessionMutationResult) {
      authenticationStore.setAuthSession(sessionMutationResult)
    }

    _props.navigation.navigate("LoggedIn")
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

      <Button testID="login-button" style={$emailButton} preset="reversed" onPress={handleLogin}>
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
