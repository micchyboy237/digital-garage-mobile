import auth from "@react-native-firebase/auth"
import { AuthError } from "app/screens/auth/errors/authErrors"
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
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<AuthError | null>(null)
  const [data, setData] = useState<{ user: User | null; session: Session | null } | null>(null)

  const signInAsync = async (
    email: string,
    password: string,
  ): Promise<{ user: User | null; session: Session | null }> => {
    let authReturn = {} as { user: User | null; session: Session | null }
    setLoading(true)
    setError(null)

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
      setData(authReturn)

      onSignIn?.(authReturn)
    } catch (error: any) {
      const authError = new AuthError(error.code)
      setError(authError)
    } finally {
      setLoading(false)
    }

    return authReturn
  }

  const registerAsync = async (
    email: string,
    password: string,
  ): Promise<{ user: User | null; session: Session | null }> => {
    let authReturn = {} as { user: User | null; session: Session | null }
    setLoading(true)
    setError(null)

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password)
      console.log("User account created & signed in!")

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
      setData(authReturn)
    } catch (error: any) {
      const authError = new AuthError(error.code)
      setError(authError)
    } finally {
      setLoading(false)
    }

    return authReturn
  }

  const signOutAsync = async (): Promise<void> => {
    await auth().signOut()
    setUser(null)
    setSession(null)
    setData(null)
    onSignOut?.(user)
  }

  return {
    loading,
    user,
    session,
    error,
    data,
    signInAsync,
    signOutAsync,
    registerAsync,
  }
}
