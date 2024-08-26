import { useNavigation } from "@react-navigation/native"
import { Button } from "app/components"
import { useAuthActions } from "app/screens/auth/useAuthActions"
import { useEmailPasswordAuth } from "app/screens/auth/useEmailPasswordAuth"
import { trpc } from "app/services/api"
import { spacing } from "app/theme"
import React from "react"
import { ViewStyle } from "react-native"

interface AuthButtonProps {
  email: string
  password: string
  isTermsAccepted: boolean
}

export const AuthEmailPwButton: React.FC<AuthButtonProps> = ({
  email,
  password,
  isTermsAccepted,
}) => {
  const navigation = useNavigation()
  const emailpwAuth = useEmailPasswordAuth()
  const { sendVerificationEmail } = useAuthActions()
  const signUpMutation = trpc.admin.user.createOneUser.useMutation()

  const loading = signUpMutation.isPending

  const handleSubmit = async () => {
    if (!isTermsAccepted) {
      alert("You must agree to the Terms of Service and Privacy Policy")
      return
    }

    console.log("registerAsync:", email, password)
    const result = await emailpwAuth.registerAsync(email, password)
    console.log("signUp result:", result)
    const signUpMutationResult = await signUpMutation.mutateAsync({
      data: result.user,
    })
    console.log("signUpMutationResult:", signUpMutationResult)
    await sendVerificationEmail()
    console.log("Verification email sent to:", email)

    console.log(
      "Final result:",
      JSON.stringify(
        {
          user: signUpMutationResult,
          // session: sessionMutationResult,
        },
        null,
        2,
      ),
    )

    navigation.replace("SignUpSuccess")
    // if (signUpMutationResult) {
    //   authenticationStore.setAuthUser(signUpMutationResult)
    // }
  }

  return (
    <Button testID="sign-up-button" style={$emailButton} preset="reversed" onPress={handleSubmit}>
      Sign Up
    </Button>
  )
}

const $emailButton: ViewStyle = {
  marginTop: spacing.xs,
  marginBottom: spacing.sm,
  backgroundColor: "#BE0E8DDE",
}
