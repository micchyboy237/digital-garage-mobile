import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { UseAuthArgs, UseAuthReturn } from "app/screens/auth/types"
import { MediaFileType, Session, User, UserRole } from "app/types"
import { useEffect, useState } from "react"

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
  // iosClientId: "com.googleusercontent.apps.499406615424-d4elcpkl46pmlnpbo2r6p4daf2avhkbs",
  webClientId: "499406615424-d4elcpkl46pmlnpbo2r6p4daf2avhkbs.apps.googleusercontent.com",
})

export const useGoogleAuth = (args?: UseAuthArgs): UseAuthReturn => {
  const { onSignIn, onSignOut } = args || {}
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged)
    return () => subscriber() // unsubscribe on unmount
  }, [])

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
        role: UserRole.user,
        id: userCredential.user.uid,
        email: userCredential.user.email,
        firstName: userCredential.user.displayName?.split(" ")[0] || undefined,
        lastName: userCredential.user.displayName?.split(" ")[1] || undefined,
        profilePicture: userCredential.user.photoURL
          ? {
              id: generateId(),
              type: MediaFileType.photo,
              mimeType: "image/jpeg",
              url: userCredential.user.photoURL,
            }
          : undefined,
      } as User

      const derivedSession: Session = {
        id: generateId(),
        token: idTokenResult.token,
        expiresAt: new Date(idTokenResult.expirationTime),
        userId: userCredential.user.uid,
      }

      googleAuthReturn = {
        user: derivedUser,
        session: derivedSession,
      }

      setSession(derivedSession)
      setUser(derivedUser)

      onSignIn?.(googleAuthReturn)
    } catch (error) {
      console.error("\nAUTH:signInAsync:error\n", error)
    }

    return googleAuthReturn
  }

  const signOutAsync = async (): Promise<void> => {
    await GoogleSignin.signOut()
    setUser(null)
    setSession(null)
    onSignOut?.(user)
  }

  const handleAuthStateChanged = async (authUser: FirebaseAuthTypes.User | null) => {
    if (authUser) {
      const idTokenResult = await authUser.getIdTokenResult()
      const derivedSession: Session = {
        token: idTokenResult.token,
        expiresAt: new Date(idTokenResult.expirationTime),
        userId: authUser.uid,
      }

      setSession(derivedSession)
      setUser({
        role: UserRole.user,
        id: authUser.uid,
        email: authUser.email,
        firstName: authUser.displayName?.split(" ")[0] || undefined,
        lastName: authUser.displayName?.split(" ")[1] || undefined,
        profilePicture: authUser.photoURL
          ? {
              type: MediaFileType.photo,
              mimeType: "image/jpeg",
              url: authUser.photoURL,
            }
          : undefined,
      })
    } else {
      setUser(null)
    }

    setLoading(false)
  }

  return {
    loading,
    user,
    session,
    signInAsync,
    signOutAsync,
  }
}
