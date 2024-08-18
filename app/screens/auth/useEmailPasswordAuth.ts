import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { UseAuthArgs, UseAuthEmailPwReturn } from "app/screens/auth/types"
import { MediaFileType, Session, User, UserRole } from "app/types"
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

export const useEmailPasswordAuth = (args?: UseAuthArgs): UseAuthEmailPwReturn => {
  const { onSignIn, onSignOut } = args || {}
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  const signInAsync = async (
    email: string,
    password: string,
  ): Promise<{ user: User | null; session: Session | null }> => {
    let authReturn = {} as { user: User | null; session: Session | null }
    setLoading(true)

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password)
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

      authReturn = {
        user: derivedUser,
        session: derivedSession,
      }

      setSession(derivedSession)
      setUser(derivedUser)

      onSignIn?.(authReturn)
    } catch (error) {
      console.error("\nAUTH:signInAsync:error\n", error)
    }

    setLoading(false)
    return authReturn
  }

  const registerAsync = async (
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential | null> => {
    let userCredential: FirebaseAuthTypes.UserCredential | null = null
    setLoading(true)
    try {
      userCredential = await auth().createUserWithEmailAndPassword(email, password)
      console.log("User account created & signed in!")
    } catch (error) {
      console.error("Error: ", error)
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!")
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!")
      }

      console.error(error)
    }
    console.log("\nAUTH:registerAsync:userCredential\n", JSON.stringify(userCredential, null, 2))
    setLoading(false)
    return userCredential
  }

  const signOutAsync = async (): Promise<void> => {
    await auth().signOut()
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
    registerAsync,
  }
}
