import auth from "@react-native-firebase/auth"
import { useCallback } from "react"

interface UseAuthActions {
  sendVerificationEmail: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (code: string, newPassword: string) => Promise<void>
}

export const useAuthActions = (): UseAuthActions => {
  const sendVerificationEmail = useCallback(async () => {
    const user = auth().currentUser
    if (user && !user.emailVerified) {
      await user.sendEmailVerification()
    } else {
      throw new Error("User is not logged in or email is already verified")
    }
  }, [])

  const forgotPassword = useCallback(async (email: string) => {
    await auth().sendPasswordResetEmail(email)
  }, [])

  const resetPassword = useCallback(async (code: string, newPassword: string) => {
    await auth().confirmPasswordReset(code, newPassword)
  }, [])

  return {
    sendVerificationEmail,
    forgotPassword,
    resetPassword,
  }
}
