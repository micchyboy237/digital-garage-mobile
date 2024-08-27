import { useUserId } from "app/models/hooks/useUserId"
import { useEffect, useState } from "react"
import Purchases, { CustomerInfo, REFUND_REQUEST_STATUS } from "react-native-purchases"

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
  const userId = useUserId()
  const [error, setError] = useState<Error | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!hasKeys()) {
      throw new Error("Please provide RevenueCat API keys")
    } else if (!entitlementId) {
      throw new Error("Please provide RevenueCat entitlement ID")
    }

    if (userId) {
      console.log("Initializing RevenueCat User:", userId)
      initializeRevenueCat(userId)
    }
  }, [userId])

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

  const initializeRevenueCat = async (userId: string): Promise<void> => {
    configureAppUserId(userId)
    // await clearCache()
    // const offerings = await Purchases.getOfferings()
    // console.log("OFFERINGS:", JSON.stringify(offerings, null, 2))
    // console.log(
    //   "OFFERINGS LENGTH:",
    //   offerings.all["Classic Garage Premium"].availablePackages.length,
    // )
    await logIn(userId)
    // await syncPurchases()
    // await restorePurchases()
    // await refundPurchase()
    const appUserID = await Purchases.getAppUserID()
    console.log("Initial appUserID:", appUserID)
  }

  const configureAppUserId = (userId: string): void => {
    try {
      const verificationMode = Purchases.ENTITLEMENT_VERIFICATION_MODE.INFORMATIONAL

      Purchases.configure({
        apiKey: APIKeys.apple,
        entitlementVerificationMode: verificationMode,
        appUserID: userId,
      })

      setInitialized(true)
      setError(null)
    } catch (error: any) {
      console.error("Error identifying user:", error)
      setError(error)
    }
  }

  const logIn = async (userId: string): Promise<void> => {
    try {
      const loginResult = await Purchases.logIn(userId)
      const customerInfo = loginResult.customerInfo
      console.log("CustomerInfo:\n", JSON.stringify(customerInfo, null, 2))
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  const refundPurchase = async (): Promise<REFUND_REQUEST_STATUS> => {
    try {
      console.info("Refunding purchase")
      const refundStatus = await Purchases.beginRefundRequestForActiveEntitlement()
      console.info("Refund status:", refundStatus)
      return refundStatus
    } catch (error) {
      console.error("Error refunding purchase:", error)
      return REFUND_REQUEST_STATUS.ERROR
    }
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
