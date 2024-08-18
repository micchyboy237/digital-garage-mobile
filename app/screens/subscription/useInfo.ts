import { useEffect, useState } from "react"
import { Platform } from "react-native"
import Purchases, { CustomerInfo, PurchasesOfferings } from "react-native-purchases"

// REPLACE THESE WITH YOUR OWN
const APIKeys = {
  // apple: "appl_GLDgBxxSMqWQDkerJIWkGGrnsLA",
  apple: "appl_kCVaHNutCTTRuubYxpoTmzyVusp",
  google: "",
  amazon: "",
}

const PRODUCTS = [
  {
    testerId: "cg.tester1@gmail.com",
    productId: "rc_cg_premium_trial_14d_3.99_4.99",
    referenceName: "Premium 14-day trial (1-3 vehicles) £0.00 | 3-mos £3.99 | £4.99",
    duration: "1 month",
    description:
      "User will receive an offer to upgrade at 7-days - 3 months at reduced rate £3.99. User will receive a reminder on day 14, account will revert to FREE. User can switch to free account (default). User will receive an offer - 3 months at reduced rate £3.99. Reverts to normal rate £4.99 at month 4.",
  },
  {
    testerId: "cg.tester2@gmail.com",
    productId: "rc_cg_monthly_standard_4.99",
    referenceName: "Monthly Standard (1-3 vehicles) £4.99",
    duration: "1 month",
    description: "Monthly Standard (1-3 vehicles) £4.99",
  },
  {
    testerId: "cg.tester3@gmail.com",
    productId: "rc_cg_monthly_premium_plus_9.99",
    referenceName: "Monthly Premium Plus (up to 12 vehicles) £9.99",
    duration: "1 month",
    description: "Monthly Premium Plus (up to 12 vehicles) £9.99",
  },
  {
    testerId: "cg.tester4@gmail.com",
    productId: "rc_cg_monthly_premium_6.99",
    referenceName: "Monthly Premium (up to 7 vehicles) £6.99",
    duration: "1 month",
    description: "Monthly Premium (up to 7 vehicles) £6.99",
  },
  {
    testerId: "cg.tester5@gmail.com",
    productId: "rc_cg_annual_premium_plus_99.99",
    referenceName: "Annual Premium Plus (up to 12 vehicles) £99.99",
    duration: "1 year",
    description: "Annual Premium Plus (up to 12 vehicles) £99.99",
  },
  {
    testerId: "cg.tester6@gmail.com",
    productId: "rc_cg_annual_premium_69.99",
    referenceName: "Annual Premium (up to 7 vehicles) £69.99",
    duration: "1 year",
    description: "Annual Premium (up to 7 vehicles) £69.99",
  },
  {
    testerId: "cg.tester7@gmail.com",
    productId: "rc_cg_annual_standard_49.99",
    referenceName: "Annual Standard (1-3 vehicles) £49.99",
    duration: "1 year",
    description: "Annual Standard (1-3 vehicles) £49.99 (two months free)",
  },
]

interface State {
  appUserID: string | null
  customerInfo: CustomerInfo | null
  offerings: PurchasesOfferings | null
  isAnonymous: boolean
}

export const useInfo = () => {
  const initialState: State = {
    appUserID: null,
    customerInfo: null,
    offerings: null,
    isAnonymous: true,
  }
  const [state, setState] = useState(initialState)
  const [inputUserId, setInputUserId] = useState(PRODUCTS[1].testerId)
  const productId = PRODUCTS.find((p) => p.testerId === inputUserId)?.productId

  const hasKeys = () => {
    return APIKeys.apple.length > 0 || APIKeys.google.length > 0 || APIKeys.amazon.length > 0
  }

  const getInfo = async () => {
    console.log("Getting info")

    try {
      // const offerings = await Purchases.getOfferings()
      // console.log("Offerings: ", JSON.stringify(offerings, null, 2))
      const products = await Purchases.getProducts(PRODUCTS.map((p) => p.productId))
      console.log("Products: ", JSON.stringify(products, null, 2))
      const customerInfo = await Purchases.getCustomerInfo()
      console.log("Customer Info", JSON.stringify(customerInfo, null, 2))
      const activeProductId = customerInfo.activeSubscriptions[0]
      const activeProduct = activeProductId
        ? products.find((p) => p.identifier === productId)
        : null
      console.log("Active product: ", JSON.stringify(activeProduct, null, 2))
      const appUserID = await Purchases.getAppUserID()
      console.log("App User ID", JSON.stringify(appUserID, null, 2))
      const isAnonymous = await Purchases.isAnonymous()
      console.log("Is Anonymous", JSON.stringify(isAnonymous, null, 2))
      const canMakePayments = await Purchases.canMakePayments()
      console.log("Can make payments", JSON.stringify(canMakePayments, null, 2))

      return {
        appUserID,
        isAnonymous,
        canMakePayments,
        customerInfo,
        activeProduct,
        products,
      }
    } catch (e) {
      console.log("Purchase get info error", e)
    }
  }

  const login = async () => {
    try {
      const loginResult = await Purchases.logIn(inputUserId)
      console.log("Login result", JSON.stringify(loginResult, null, 2))
    } catch (e) {
      console.log("Login error", e)
    }
  }

  const logout = async () => {
    try {
      const logoutResult = await Purchases.logOut()
      console.log("Logout result", JSON.stringify(logoutResult, null, 2))
    } catch (e) {
      console.log("Logout error", e)
    }
  }

  const triggerPurchase = async () => {
    try {
      const purchaseResult = await Purchases.purchaseProduct(productId)
      return purchaseResult
    } catch (e) {
      console.log("Purchase error", e)
    }
  }

  const sampleTriggers = async () => {
    await Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
    await Purchases.invalidateCustomerInfoCache()
    await Purchases.setAllowSharingStoreAccount(false)
    await logout()
    await login()
    const { activeProduct } = await getInfo()
    if (activeProduct) {
      console.log("Begin refund request for product: ", activeProduct)
      const refundRequestStatus = await Purchases.beginRefundRequestForProduct(activeProduct)
      console.log("Refund request status: ", refundRequestStatus)
    } else {
      console.log("No active product found. Triggering purchase.")
      const purchaseResult = await triggerPurchase()
      console.log("Purchase result: ", JSON.stringify(purchaseResult, null, 2))
    }
  }

  useEffect(() => {
    if (!hasKeys()) {
      return
    }

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
        appUserID: inputUserId,
      })
    }

    sampleTriggers()
  }, [inputUserId])

  return null
}
