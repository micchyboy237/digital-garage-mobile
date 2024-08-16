import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useEffect, useState } from "react"

interface UseAuthStateChangedArgs {
  onAuthStateChanged?: (user: FirebaseAuthTypes.User | null) => void
}

interface UseAuthStateChangedReturn {
  initializing: boolean
  isLoggedIn: boolean
}

export const useAuthStateChanged = (args?: UseAuthStateChangedArgs): UseAuthStateChangedReturn => {
  const { onAuthStateChanged } = args || {}
  const [initializing, setInitializing] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const handleAuthStateChanged = async (authUser: FirebaseAuthTypes.User | null) => {
    console.log("\nAUTH:onAuthStateChanged\n", JSON.stringify(authUser, null, 2))
    setInitializing(false)
    setIsLoggedIn(!!authUser)
    onAuthStateChanged?.(authUser)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged)
    return () => subscriber() // unsubscribe on unmount
  }, [])

  return {
    initializing,
    isLoggedIn,
  }
}
