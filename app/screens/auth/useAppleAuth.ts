import appleAuth from "@invertase/react-native-apple-authentication"
import auth from "@react-native-firebase/auth"
import { Session } from "app/models/session/Session"
import { User } from "app/models/user/User"
import { UseAuthArgs, UseAuthReturn } from "app/screens/auth/types"
import { jwtDecode } from "jwt-decode"
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

export const useAppleAuth = (args?: UseAuthArgs): UseAuthReturn => {
  const { onSignIn, onSignOut } = args || {}
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  const signInAsync = async (): Promise<{
    user: User | null
    session: Session | null
  }> => {
    let appleAuthReturn = {} as {
      user: User | null
      session: Session | null
    }
    console.log("\nAUTH:signInAsync")
    setLoading(true)

    try {
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      })
      console.log("\nAUTH:appleAuthResponse\n", JSON.stringify(appleAuthResponse, null, 2))
      // other fields are available, but full name is not
      const { email, email_verified, is_private_email, sub } = jwtDecode(
        appleAuthResponse.identityToken,
      )
      console.log("\nAUTH:appleAuthResponse:email\n", {
        email,
        email_verified,
        is_private_email,
        sub,
      })

      if (!appleAuthResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identity token returned")
      }

      const { identityToken, nonce } = appleAuthResponse
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

      // Sign the user in with the credential
      const userCredential = await auth().signInWithCredential(appleCredential)
      console.log("\nAUTH:signInAsync:userCredential\n", JSON.stringify(userCredential, null, 2))

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
        provider: "APPLE",
        userId: userCredential.user.uid,
      } as Session

      appleAuthReturn = {
        user: derivedUser,
        session: derivedSession,
      }
      setSession(derivedSession)
      setUser(derivedUser)

      console.log("\nAUTH:signInAsync:derivedSession\n", JSON.stringify(derivedSession, null, 2))
      console.log("\nAUTH:signInAsync:derivedUser\n", JSON.stringify(derivedUser, null, 2))

      onSignIn?.({
        user: derivedUser,
        session: derivedSession,
      })
    } catch (error) {
      console.error("\nAUTH:signInAsync:error\n", error)
    }

    return appleAuthReturn
  }

  const signOutAsync = async (): Promise<void> => {
    console.log("\nAUTH:signOutAsync")

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
