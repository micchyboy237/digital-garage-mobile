import { useUserEmail } from "app/models/hooks/useUserEmail"
import { useEffect, useState } from "react"
import Purchases from "react-native-purchases"

type UseInitializeRevenueCatReturn = {
  initialized: boolean
  error: Error | null
}

const APIKeys = {
  // apple: "appl_GLDgBxxSMqWQDkerJIWkGGrnsLA",
  apple: "appl_kCVaHNutCTTRuubYxpoTmzyVusp",
  google: "",
  amazon: "",
}
const entitlementId = "Classic Garage Entitlement"

const hasKeys = () => {
  return APIKeys.apple.length > 0 || APIKeys.google.length > 0 || APIKeys.amazon.length > 0
}

export const useInitializeRevenueCat = (): UseInitializeRevenueCatReturn => {
  const userEmail = useUserEmail()
  const [error, setError] = useState<Error | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!hasKeys()) {
      throw new Error("Please provide RevenueCat API keys")
    } else if (!entitlementId) {
      throw new Error("Please provide RevenueCat entitlement ID")
    }

    if (userEmail) {
      initializeRevenueCat(userEmail)
    }
  }, [userEmail])

  const initializeRevenueCat = async (userEmail: string): Promise<void> => {
    try {
      const verificationMode = Purchases.ENTITLEMENT_VERIFICATION_MODE.INFORMATIONAL

      Purchases.configure({
        apiKey: APIKeys.apple,
        entitlementVerificationMode: verificationMode,
        appUserID: userEmail,
      })

      setInitialized(true)
      setError(null)
    } catch (error: any) {
      console.error("Error identifying user:", error)
      setError(error)
    }
  }

  return { initialized, error }
}
