import { useEffect, useState } from "react"
import { Platform } from "react-native"
import Purchases, {
  CustomerInfo,
  PurchasesConfiguration,
  PurchasesPackage,
} from "react-native-purchases"

type UseRevenueCatReturn = {
  packages: PurchasesPackage[]
  customerInfo: CustomerInfo | null
  fetchPackages: () => Promise<void>
  makePurchase: (pkg: PurchasesPackage) => Promise<void>
  restorePurchases: () => Promise<void>
}

interface Options extends PurchasesConfiguration {
  entitlementId?: string
}

const APIKeys = {
  // apple: "appl_GLDgBxxSMqWQDkerJIWkGGrnsLA",
  apple: "appl_kCVaHNutCTTRuubYxpoTmzyVusp",
  google: "",
  amazon: "",
}

const hasKeys = () => {
  return APIKeys.apple.length > 0 || APIKeys.google.length > 0 || APIKeys.amazon.length > 0
}

export const useRevenueCat = (appUserID?: string, options?: Options): UseRevenueCatReturn => {
  const { entitlementId } = options || {}
  const [packages, setPackages] = useState<PurchasesPackage[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

  useEffect(() => {
    if (!hasKeys()) {
      throw new Error("Please provide RevenueCat API keys")
    } else if (!appUserID) {
      throw new Error("Please provide RevenueCat app user ID")
    }

    setupPurchases()
    fetchPackages()
  }, [])

  const setupPurchases = (): void => {
    const verificationMode = Purchases.ENTITLEMENT_VERIFICATION_MODE.INFORMATIONAL

    if (Platform.OS === "android") {
      const useAmazon = false
      if (useAmazon) {
        Purchases.configure({
          apiKey: APIKeys.amazon,
          useAmazon: true,
          entitlementVerificationMode: verificationMode,
        })
      } else {
        Purchases.configure({
          apiKey: APIKeys.google,
          entitlementVerificationMode: verificationMode,
        })
      }
    } else {
      Purchases.configure({
        apiKey: APIKeys.apple,
        entitlementVerificationMode: verificationMode,
        appUserID,
      })
    }
  }

  const fetchPackages = async (): Promise<void> => {
    try {
      const offerings = await Purchases.getOfferings()
      if (offerings.current) {
        setPackages(offerings.current.availablePackages)
      }
    } catch (error) {
      console.error("Error fetching offerings:", error)
    }
  }

  const makePurchase = async (pkg: PurchasesPackage): Promise<void> => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg)
      setCustomerInfo(customerInfo)
      if (entitlementId && customerInfo.entitlements.active[entitlementId]) {
        // Grant access to premium features
      }
    } catch (error) {
      console.error("Purchase failed:", error)
    }
  }

  const restorePurchases = async (): Promise<void> => {
    try {
      const customerInfo = await Purchases.restorePurchases()
      setCustomerInfo(customerInfo)
      // Handle restored purchases
    } catch (error) {
      console.error("Error restoring purchases:", error)
    }
  }

  return {
    packages,
    customerInfo,
    fetchPackages,
    makePurchase,
    restorePurchases,
  }
}
