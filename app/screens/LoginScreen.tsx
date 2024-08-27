import { useNavigation } from "@react-navigation/native"
import { AspectRatioImage } from "app/components/image/AspectRatioImage"
import { Session } from "app/models/session/Session"
import { LoginErrorCodes } from "app/screens/auth/errors/errors"
import { fetchExistingUser } from "app/screens/auth/sign-up/api"
import { SignInButton } from "app/screens/auth/SignInButton"
import { useAppleAuth } from "app/screens/auth/useAppleAuth"
import { useAuthActions } from "app/screens/auth/useAuthActions"
import { useEmailPasswordAuth } from "app/screens/auth/useEmailPasswordAuth"
import { useGoogleAuth } from "app/screens/auth/useGoogleAuth"
import { generateFingerprint } from "app/screens/auth/utils"
import { trpc } from "app/services/api"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
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

const logoWithText = require("../../assets/app-icons/classic-garage.png")

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const navigation = useNavigation()
  const authPasswordInput = useRef<TextInput>(null)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const { authenticationStore } = useStores()

  const emailpwAuth = useEmailPasswordAuth()
  const appleAuth = useAppleAuth()
  const googleAuth = useGoogleAuth()
  const userCreateMutation = trpc.admin.user.createOneUser.useMutation()
  const userUpdateMutation = trpc.admin.user.updateOneUser.useMutation()
  const sessionCreateMutation = trpc.admin.session.createOneSession.useMutation()
  const sessionUpdateMutation = trpc.admin.session.updateOneSession.useMutation()
  const profileCreateMutation = trpc.admin.profile.createOneProfile.useMutation()

  const { sendVerificationEmail } = useAuthActions()

  // useEffect(() => {
  //   signOutAsync()
  // }, [])

  const [authEmail, setAuthEmail] = useState<string>("")
  const [authPassword, setAuthPassword] = useState<string>("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail(authenticationStore.loginForm.email)
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      // setAuthEmail("")
    }
  }, [authenticationStore.loginForm.email])

  // const error = isSubmitted ? validationError : ""

  const handleLoginEmailPw = async () => {
    const result = await emailpwAuth.signInAsync(authEmail, authPassword)

    console.log("handleLoginEmailPw:", result)

    // Check if user exists by firebaseUid
    if (result.user) {
      const existingUser = await fetchExistingUser(result.user.email)
      if (existingUser) {
        authenticationStore.setAuthUser({
          ...existingUser,
          profile: existingUser.profile?.id,
          subscription: existingUser.subscription?.id,
          sessions: existingUser.sessions?.map((session: Session) => session?.id),
        })
        authenticationStore.setAuthSubscription(existingUser.subscription)
        const deviceFingerprint = await generateFingerprint(existingUser.id)
        authenticationStore.setAuthSession(
          existingUser.sessions.find((session) => session?.deviceFingerprint === deviceFingerprint),
        )
        authenticationStore.setAuthProfile(existingUser.profile)
        _props.navigation.navigate("LoggedIn")
      } else {
        const userMutationResult = await userCreateMutation.mutateAsync({
          data: {
            ...result.user,
          },
          include: { profile: true, sessions: true, subscription: true },
        })

        authenticationStore.setAuthUser({
          ...userMutationResult,
          profile: userMutationResult.profile?.id,
          subscription: userMutationResult.subscription?.id,
          sessions: userMutationResult.sessions.map((session: Session) => session?.id),
        })
        const sessionMutationResult = await sessionCreateMutation.mutateAsync({
          data: {
            ...result.session,
          },
          include: { user: true },
          where: { deviceFingerprint: result.session?.deviceFingerprint },
        })
        authenticationStore.setAuthSession(sessionMutationResult)

        authenticationStore.setLoginFormEmail(authEmail)

        _props.navigation.navigate("LoggedIn")
      }
    }
  }

  const handleLoginSocial = (provider: "apple" | "google") => async () => {
    const result =
      provider === "apple" ? await appleAuth.signInAsync() : await googleAuth.signInAsync()
    const existingUser = await fetchExistingUser(result.user.email)
    // Check if user exists by firebaseUid
    let userMutationResult

    console.log("existingUser:\n", existingUser)

    if (existingUser) {
      // Update existing user
      userMutationResult = await userUpdateMutation.mutateAsync({
        where: { firebaseUid: result.user?.firebaseUid },
        data: { ...result.user }, // Update user data as necessary
        include: { profile: true, sessions: true, subscription: true },
      })
    } else {
      // Create new user
      userMutationResult = await userCreateMutation.mutateAsync({
        data: result.user,
        include: { profile: true, sessions: true, subscription: true },
      })

      const profileMutation = profileCreateMutation
      const profileMutationResult = await profileMutation.mutateAsync({
        data: {
          ...result.profile,
        },
      })
      authenticationStore.setAuthProfile(profileMutationResult)
    }

    const sessionMutation = existingUser ? sessionUpdateMutation : sessionCreateMutation
    const sessionMutationResult = await sessionMutation.mutateAsync({
      data: {
        ...result.session,
      },
      include: { user: true },
      where: { deviceFingerprint: result.session?.deviceFingerprint },
    })

    if (userMutationResult) {
      const { profile, subscription, sessions, ...authUser } = userMutationResult
      authenticationStore.setAuthUser({
        ...authUser,
        profile: profile?.id,
        subscription: subscription?.id,
        sessions: sessions.map((session: Session) => session?.id),
      })
      authenticationStore.setAuthSubscription(subscription)
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
        <AspectRatioImage source={logoWithText} width={207} style={$logo} />

        <Text preset="subheading" style={$enterDetails}>
          Login to your account
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
        onSubmitEditing={handleLoginEmailPw}
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
        <View
          style={{
            marginBottom: spacing.sm,
            flexDirection: "row",
            justifyContent: "center",
            gap: spacing.xxs,
          }}
        >
          <Text
            style={{
              color: colors.error,
            }}
          >
            {emailpwAuth.error.message}
          </Text>
          {emailpwAuth.error.code === LoginErrorCodes.EMAIL_NOT_VERIFIED && (
            <Text
              style={{ color: colors.error, textDecorationLine: "underline" }}
              onPress={async () => {
                await sendVerificationEmail()
                console.log("Sent verification email!!")
                emailpwAuth.resetError()
              }}
            >
              Resend link
            </Text>
          )}
        </View>
      )}

      <Button
        testID="login-button"
        style={$emailButton}
        preset="reversed"
        onPress={handleLoginEmailPw}
      >
        Log In
      </Button>

      <View style={$socialButtonContainer}>
        <SignInButton
          style={$socialButton}
          textStyle={$socialButtonText}
          type="apple"
          onPress={handleLoginSocial("apple")}
        />
        <SignInButton
          style={$socialButton}
          textStyle={$socialButtonText}
          type="google"
          onPress={handleLoginSocial("google")}
        />
      </View>

      <Text style={$userPrompt}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp")
        }}
      >
        <Text style={$userButton}>Sign up</Text>
      </TouchableOpacity>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $logo: ViewStyle = {
  alignSelf: "center",
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
  fontSize: 24,
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
  minHeight: 48,
  // flex: 1,
  justifyContent: "center",
}

const $socialButtonText: TextStyle = {
  fontSize: 16,
}

const $userPrompt: TextStyle = {
  marginTop: spacing.xxl,
  textAlign: "center",
  color: colors.palette.neutral800,
}

const $userButton: TextStyle = {
  textAlign: "center",
  color: "#BE0E8DDE",
  fontWeight: "bold",
}
