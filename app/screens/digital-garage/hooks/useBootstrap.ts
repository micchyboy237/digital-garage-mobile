import { useEffect, useState } from "react"
import { Platform } from "react-native"
import Purchases, { CustomerInfo, PurchasesOfferings } from "react-native-purchases"

// REPLACE THESE WITH YOUR OWN
const APIKeys = {
  // apple: 'appl_thPsOjxByRiEeUGofyZZcUsYwok',
  apple: "appl_GLDgBxxSMqWQDkerJIWkGGrnsLA",
  google: "",
  amazon: "",
}

interface State {
  appUserID: string | null
  customerInfo: CustomerInfo | null
  offerings: PurchasesOfferings | null
  isAnonymous: boolean
}

export const useBootstrap = () => {
  const initialState: State = {
    appUserID: null,
    customerInfo: null,
    offerings: null,
    isAnonymous: true,
  }
  const [state, setState] = useState(initialState)
  const [inputUserId, setInputUserId] = useState("jet@agileminds.com")
  const [productId, setProductId] = useState("rc_dg_premium_trial_14d_3.99_4.99")

  const hasKeys = () => {
    return APIKeys.apple.length > 0 || APIKeys.google.length > 0 || APIKeys.amazon.length > 0
  }

  const getInfo = async () => {
    console.log("Getting info")
    // const logoutResult = await Purchases.logOut()
    // console.log("Logout result", JSON.stringify(logoutResult, null, 2))
    const loginResult = await Purchases.logIn(inputUserId)
    console.log("Login result", JSON.stringify(loginResult, null, 2))

    try {
      const customerInfo = await Purchases.getCustomerInfo()
      console.log("Customer Info", JSON.stringify(customerInfo, null, 2))
      const appUserID = await Purchases.getAppUserID()
      console.log("App User ID", JSON.stringify(appUserID, null, 2))
      const isAnonymous = await Purchases.isAnonymous()
      console.log("Is Anonymous", JSON.stringify(isAnonymous, null, 2))
      const canMakePayments = await Purchases.canMakePayments()
      console.log("Can make payments", JSON.stringify(canMakePayments, null, 2))

      const offerings = await Purchases.getOfferings()
      console.log("Offerings: ", JSON.stringify(offerings, null, 2))
      const products = await Purchases.getProducts([productId])
      console.log("Products: ", JSON.stringify(products, null, 2))
      await triggerPurchase()
    } catch (e) {
      console.log("Purchase get info error", e)
    }
  }

  const triggerPurchase = async () => {
    try {
      const purchaseResult = await Purchases.purchaseProduct(productId)
      console.log("Purchase result: ", JSON.stringify(purchaseResult, null, 2))
    } catch (e) {
      console.log("Purchase error", e)
    }
  }

  useEffect(() => {
    if (!hasKeys()) {
      return
    }

    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)

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
      })
    }

    getInfo()
  }, [])

  return null
}
