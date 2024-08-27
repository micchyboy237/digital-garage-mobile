import { useUserId } from "app/models/hooks/useUserId"
import { PeriodUnit } from "app/screens/subscription/types"
import { derivePeriodUnit } from "app/screens/subscription/utils"
import { useEffect, useState } from "react"
import Purchases, {
  CustomerInfo,
  MakePurchaseResult,
  PurchasesEntitlementInfo,
  PurchasesOffering,
  PurchasesPackage,
  REFUND_REQUEST_STATUS,
} from "react-native-purchases"

// Omit both transactionIdentifier and productIdentifier

type MakePurchaseReturn = Omit<MakePurchaseResult, "transaction"> & {
  subscriptionPeriodUnit: PeriodUnit | null
  isActive: boolean
  expiresAt: string | null
  originalPurchaseDate: string
  payment?: {
    price: number | null
    currencyCode: string
    status: "PAID"
    transactionId: string
    transactionDate: string
  }
}

type UseRevenueCatReturn = {
  packages: PurchasesPackage[]
  customerInfo: CustomerInfo | null
  currentOffering: PurchasesOffering | null
  hasActiveEntitlement: boolean
  activeEntitlementInfo: PurchasesEntitlementInfo | null
  fetchPackages: () => Promise<void>
  refundPurchase: () => Promise<REFUND_REQUEST_STATUS>
  makePurchase: (pkg: PurchasesPackage) => Promise<MakePurchaseReturn | void>
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
  const userId = useUserId()
  const [packages, setPackages] = useState<PurchasesPackage[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null)
  const activeEntitlementInfo = customerInfo?.entitlements.active[entitlementId] || null
  const hasActiveEntitlement = !!activeEntitlementInfo?.isActive

  console.log("activeEntitlementInfo:\n", JSON.stringify(activeEntitlementInfo, null, 2))
  console.log("hasActiveEntitlement:", hasActiveEntitlement)

  useEffect(() => {
    if (!hasKeys()) {
      throw new Error("Please provide RevenueCat API keyss")
    } else if (!entitlementId) {
      throw new Error("Please provide RevenueCat entitlement ID")
    }

    if (userId) {
      setupPurchases()
      fetchPackages()
    }
  }, [userId])

  const setupPurchases = async (): Promise<void> => {
    const appUserID = await Purchases.getAppUserID()
    console.log("RevenueCat appUserID:", appUserID)
    const customerInfo = await Purchases.getCustomerInfo()
    setCustomerInfo(customerInfo)
    await fetchPackages()
  }

  const fetchPackages = async (): Promise<void> => {
    try {
      const offerings = await Purchases.getOfferings()
      const allOfferingsKeys = Object.keys(offerings.all)
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

  const makePurchase = async (pkg: PurchasesPackage): Promise<MakePurchaseReturn | void> => {
    try {
      console.log("Making purchase:\n", JSON.stringify(pkg, null, 2))
      const purchasePackageResult = await Purchases.purchasePackage(pkg)
      console.log("Purchase successful:\n", JSON.stringify(purchasePackageResult, null, 2))
      setCustomerInfo(purchasePackageResult.customerInfo)
      if (entitlementId) {
        const entitlement = purchasePackageResult.customerInfo.entitlements.active[entitlementId]
        const products = await Purchases.getProducts([entitlement.productIdentifier])
        const product = products[0]
        const subscriptionPeriodUnit = product.subscriptionPeriod
          ? derivePeriodUnit(product.subscriptionPeriod)
          : null
        console.info("User has access to premium features")
        const { transaction, ...purchaseResult } = purchasePackageResult
        // Grant access to premium features
        return {
          ...purchaseResult,
          isActive: entitlement.isActive,
          expiresAt: entitlement.expirationDate,
          originalPurchaseDate: entitlement.originalPurchaseDate,
          subscriptionPeriodUnit,
          payment:
            typeof product.price !== "number"
              ? undefined
              : {
                  price: entitlement.isActive ? product.price : null,
                  currencyCode: product.currencyCode,
                  status: "PAID",
                  transactionId: transaction.transactionIdentifier,
                  transactionDate: transaction.purchaseDate,
                },
        }
      }
    } catch (error) {
      const appUserID = await Purchases.getAppUserID()
      console.error(`Purchase failed (${appUserID}):`, error)
    }
  }

  const syncPurchases = async (): Promise<void> => {
    try {
      await Purchases.syncPurchases()
      console.log("Purchases synced")
    } catch (error: any) {
      console.error("Error syncing purchases:", error)
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
    hasActiveEntitlement,
    activeEntitlementInfo,
    fetchPackages,
    makePurchase,
    refundPurchase,
    restorePurchases,
  }
}
