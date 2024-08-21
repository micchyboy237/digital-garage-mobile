import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Session } from "app/models/session/Session"
import { User } from "app/models/user/User"
import { UseAuthArgs, UseAuthReturn } from "app/screens/auth/types"
import { useState } from "react"

const generateId = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}

GoogleSignin.configure({
  scopes: ["profile", "email"],
  webClientId: "499406615424-d4elcpkl46pmlnpbo2r6p4daf2avhkbs.apps.googleusercontent.com",
})

export const useGoogleAuth = (args?: UseAuthArgs): UseAuthReturn => {
  const { onSignIn, onSignOut } = args || {}
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  const signInAsync = async (): Promise<{ user: User | null; session: Session | null }> => {
    let googleAuthReturn = {} as { user: User | null; session: Session | null }
    setLoading(true)

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const { idToken } = await GoogleSignin.signIn()

      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const userCredential = await auth().signInWithCredential(googleCredential)

      const idTokenResult = await userCredential.user.getIdTokenResult()

      const derivedUser = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        firebaseUid: userCredential.user.uid,
        profile: undefined,
        subscription: undefined,
        accountStatus: "ONBOARDING",
      } as User

      const derivedSession = {
        id: generateId(),
        token: idTokenResult.token,
        expiresAt: new Date(idTokenResult.expirationTime),
        provider: "GOOGLE",
        userId: userCredential.user.uid,
      } as Session

      googleAuthReturn = {
        user: derivedUser,
        session: derivedSession,
      }

      setSession(derivedSession)
      setUser(derivedUser)

      onSignIn?.({
        user: derivedUser,
        session: derivedSession,
      })
    } catch (error) {
      console.error("\nAUTH:signInAsync:error\n", error)
    }

    setLoading(false)
    return googleAuthReturn
  }

  const signOutAsync = async (): Promise<void> => {
    await GoogleSignin.signOut()
    setUser(null)
    setSession(null)
    onSignOut?.(user)
  }

  return {
    loading,
    user,
    session,
    signInAsync,
    signOutAsync,
  }
}
