import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { ErrorMessages } from "app/errors"
import { trpc } from "app/services/api"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { Image, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const logo = require("../../assets/images/logo.png")

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const navigation = useNavigation()
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()
  const mutation = trpc.oldAuth.login.useMutation({
    onSuccess: (data) => {
      console.log("login success:", data)
      setAuthToken(data.accessToken)
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

  console.log("login mutation:", {
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    errorCode: mutation.error?.message,
    data: mutation.data,
    error: ErrorMessages[mutation.error?.message],
  })

  // const error = isSubmitted ? validationError : ""
  const error = mutation.isError && ErrorMessages[mutation.error?.message]

  async function handleLogin() {
    mutation.mutate({ email: authEmail, password: authPassword })
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

      {error && (
        <Text
          style={{
            color: colors.error,
            marginBottom: spacing.sm,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      )}

      <Button testID="login-button" style={$logIn} preset="reversed" onPress={handleLogin}>
        Log In
      </Button>

      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginBottom: spacing.sm,
        }}
        onPress={() => {
          navigation.navigate("ForgotPassword")
        }}
      >
        <Text style={$signUpButton}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={$appleButton}
        onPress={() => {
          // Handle Apple sign-in
        }}
      >
        <FontAwesome name="apple" size={24} color="white" />
        <Text style={$appleButtonText}>Sign in with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={$googleButton}
        onPress={() => {
          // Handle Google sign-in
        }}
      >
        <FontAwesome name="google" size={24} color="black" />
        <Text style={$googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

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

const $signUpPrompt: TextStyle = {
  marginTop: spacing.xxl,
  textAlign: "center",
  color: colors.palette.neutral800,
}

const $signUpButton: TextStyle = {
  textAlign: "center",
  color: "#BE0E8DDE",
  fontWeight: "bold",
  marginTop: spacing.xs,
}
