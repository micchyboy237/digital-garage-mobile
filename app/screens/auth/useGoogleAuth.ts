import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Profile } from "app/models/profile/Profile"
import { Session } from "app/models/session/Session"
import { User } from "app/models/user/User"
import { UseAuthArgs, UseAuthReturn } from "app/screens/auth/types"
import { generateFingerprint } from "app/screens/auth/utils"
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

  const signInAsync = async (): Promise<{
    user: User | null
    session: Session | null
    profile: Profile | null
  }> => {
    let googleAuthReturn = {} as {
      user: User | null
      session: Session | null
      profile: Profile | null
    }
    setLoading(true)

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const { idToken } = await GoogleSignin.signIn()

      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const userCredential = await auth().signInWithCredential(googleCredential)
      console.log("\nAUTH:signInAsync:userCredential\n", JSON.stringify(userCredential, null, 2))

      const idTokenResult = await userCredential.user.getIdTokenResult()

      const derivedUser = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        firebaseUid: userCredential.user.uid,
        isEmailVerified: userCredential.user.emailVerified,
      } as User

      const deviceFingerprint = await generateFingerprint(derivedUser.id)
      const derivedSession = {
        token: idTokenResult.token,
        expiresAt: new Date(idTokenResult.expirationTime),
        provider: "GOOGLE",
        deviceFingerprint,
        userId: userCredential.user.uid,
      } as Session

      const derivedProfile = {
        firstName: userCredential.additionalUserInfo?.profile?.given_name,
        lastName: userCredential.additionalUserInfo?.profile?.family_name,
        userId: userCredential.user.uid,
      } as Profile

      googleAuthReturn = {
        user: derivedUser,
        session: derivedSession,
        profile: derivedProfile,
      }

      setSession(derivedSession)
      setUser(derivedUser)

      console.log("\nAUTH:signInAsync:derivedSession\n", JSON.stringify(derivedSession, null, 2))
      console.log("\nAUTH:signInAsync:derivedUser\n", JSON.stringify(derivedUser, null, 2))

      onSignIn?.({
        user: derivedUser,
        session: derivedSession,
        profile: derivedProfile,
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
