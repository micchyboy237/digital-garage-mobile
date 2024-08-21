import { useUserEmail } from "app/models/hooks/useUserEmail"
import { useEffect, useState } from "react"
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases"

type UseRevenueCatReturn = {
  packages: PurchasesPackage[]
  customerInfo: CustomerInfo | null
  currentOffering: PurchasesOffering | null
  fetchPackages: () => Promise<void>
  makePurchase: (pkg: PurchasesPackage) => Promise<void>
  restorePurchases: () => Promise<void>
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

export const useRevenueCat = (): UseRevenueCatReturn => {
  const userEmail = useUserEmail()
  const [packages, setPackages] = useState<PurchasesPackage[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null)

  useEffect(() => {
    if (!hasKeys()) {
      throw new Error("Please provide RevenueCat API keyss")
    } else if (!userEmail) {
      throw new Error("Please provide RevenueCat user email")
    } else if (!entitlementId) {
      throw new Error("Please provide RevenueCat entitlement ID")
    }

    setupPurchases(userEmail)
    fetchPackages()
  }, [userEmail])

  const setupPurchases = async (userEmail: string): Promise<void> => {
    await logIn(userEmail)
    await fetchPackages()
  }

  const fetchPackages = async (): Promise<void> => {
    try {
      const offerings = await Purchases.getOfferings()
      console.log("MyOfferings:\n", JSON.stringify(offerings, null, 2))
      const allOfferingsKeys = Object.keys(offerings.all)
      console.log("Offerings Keys:", allOfferingsKeys)
      const availablePackages = offerings.all[allOfferingsKeys[0]].availablePackages
      // availablePackages = await updateWithPromos(availablePackages)
      setPackages(availablePackages)
      if (offerings.current) {
        setCurrentOffering(offerings.current)
      }
    } catch (error) {
      console.error("Error fetching offerings:", error)
    }
  }

  // const updateWithPromos = async (packages: PurchasesPackage[]): Promise<PurchasesPackage[]> => {
  //   // Call Promise.all() to fetch promo products from each package
  //   return Promise.all(
  //     packages.map(async (pkg) => {
  //       const storeProduct = pkg.product
  //       const discount = storeProduct.discounts?.[0] as PurchasesStoreProductDiscount
  //       try {
  //         const promo = await Purchases.getPromotionalOffer(storeProduct, discount)
  //         console.log("PROMO:\n", JSON.stringify(promo, null, 2))
  //         return {
  //           ...pkg,
  //           promo,
  //         }
  //       } catch (error) {
  //         console.error("Error fetching promo:", error)
  //         return pkg
  //       }
  //     }),
  //   )
  // }

  const logIn = async (userEmail: string): Promise<void> => {
    try {
      const loginResult = await Purchases.logIn(userEmail)

      console.log("User logged in:\n", JSON.stringify(loginResult, null, 2))

      setCustomerInfo(loginResult.customerInfo)
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  // const logOut = async (): Promise<CustomerInfo | null> => {
  //   let customerInfo: CustomerInfo | null = null
  //   try {
  //     customerInfo = await Purchases.logOut()
  //     console.log("User logged out:\n", JSON.stringify(customerInfo, null, 2))
  //   } catch (error) {
  //     console.error("Error logging out:", error)
  //   }
  //   return customerInfo
  // }

  const makePurchase = async (pkg: PurchasesPackage): Promise<void> => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg)
      setCustomerInfo(customerInfo)
      if (entitlementId && customerInfo.entitlements.active[entitlementId]) {
        console.info("User has access to premium features")
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
    currentOffering,
    fetchPackages,
    makePurchase,
    restorePurchases,
  }
}
