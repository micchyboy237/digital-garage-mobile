import { useUserEmail } from "app/models/hooks/useUserEmail"
import { useEffect, useState } from "react"
import Purchases, { CustomerInfo } from "react-native-purchases"

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
      console.log("Initializing RevenueCat User:", userEmail)
      initializeRevenueCat(userEmail)
    }
  }, [userEmail])

  useEffect(() => {
    const customerInfoListener = (customerInfo: CustomerInfo) => {
      console.log("LISTENER:customerInfo\n", JSON.stringify(customerInfo, null, 2))
      const activeEntitlementInfo = customerInfo?.entitlements.active[entitlementId]
      const hasActiveEntitlement = !!activeEntitlementInfo?.isActive
      console.log(
        "LISTENER:activeEntitlementInfo\n",
        JSON.stringify(activeEntitlementInfo, null, 2),
      )
      console.log("LISTENER:hasActiveEntitlement:", hasActiveEntitlement)
    }
    Purchases.addCustomerInfoUpdateListener(customerInfoListener)
    return () => {
      Purchases.removeCustomerInfoUpdateListener(customerInfoListener)
    }
  }, [])

  const initializeRevenueCat = async (userEmail: string): Promise<void> => {
    await configureAppUserId(userEmail)
    await clearCache()
    await syncPurchases()
    // const offerings = await Purchases.getOfferings()
    // console.log("OFFERINGS:", JSON.stringify(offerings, null, 2))
    // console.log(
    //   "OFFERINGS LENGTH:",
    //   offerings.all["Classic Garage Premium"].availablePackages.length,
    // )
    await logIn(userEmail)
    // await restorePurchases()
    const appUserID = await Purchases.getAppUserID()
    console.log("Initial appUserID:", appUserID)
  }

  const configureAppUserId = async (userEmail: string): Promise<void> => {
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

  const logIn = async (userEmail: string): Promise<void> => {
    try {
      const loginResult = await Purchases.logIn(userEmail)
      const customerInfo = loginResult.customerInfo
      console.log("CustomerInfo:\n", JSON.stringify(customerInfo, null, 2))
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  const logOut = async (): Promise<CustomerInfo | null> => {
    let customerInfo: CustomerInfo | null = null
    try {
      customerInfo = await Purchases.logOut()
      console.log("User logged out:\n", JSON.stringify(customerInfo, null, 2))
    } catch (error) {
      console.error("Error logging out:", error)
    }
    return customerInfo
  }

  const restorePurchases = async (): Promise<void> => {
    try {
      const customerInfo = await Purchases.restorePurchases()
      console.log("Purchases restored:\n", JSON.stringify(customerInfo, null, 2))
    } catch (error: any) {
      console.error("Error restoring purchases:", error)
      setError(error)
    }
  }

  const syncPurchases = async (): Promise<void> => {
    try {
      await Purchases.syncPurchases()
      console.log("Purchases synced")
    } catch (error: any) {
      console.error("Error syncing purchases:", error)
      setError(error)
    }
  }

  const clearCache = async (): Promise<void> => {
    try {
      await Purchases.invalidateCustomerInfoCache()
      console.log("Cache cleared")
    } catch (error: any) {
      console.error("Error clearing cache:", error)
      setError(error)
    }
  }

  return { initialized, error }
}
