import { PeriodUnit } from "app/screens/subscription/types"
import { PurchasesStoreProduct } from "react-native-purchases"

export const currencySymbolMap: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  // Add other currency symbols as needed
}

export const subscriptionPeriodAbbreviationMap: Record<PeriodUnit, string> = {
  [PeriodUnit.Day]: "day",
  [PeriodUnit.Week]: "wk",
  [PeriodUnit.Month]: "mo",
  [PeriodUnit.Year]: "yr",
}

export const derivePeriodUnit = (subscriptionPeriod: string): PeriodUnit | null => {
  if (subscriptionPeriod.includes("M")) return PeriodUnit.Month
  if (subscriptionPeriod.includes("Y")) return PeriodUnit.Year
  return null
}

export const deriveFeatures = (product: PurchasesStoreProduct): string[] => {
  const features: string[] = []

  features.push("Up to 3 vehicles")
  features.push("All premium features")

  let promoOffer = ""
  if (product.introPrice) {
    let offerContext = "Free"
    if (product.introPrice.price > 0) {
      offerContext = product.introPrice.priceString
    }
    promoOffer += `${offerContext} for ${
      product.introPrice.periodNumberOfUnits * product.introPrice.cycles
    } ${product.introPrice.periodUnit.toLowerCase()}`
  }

  if (product.discounts.length > 0) {
    const discount = product.discounts[0] // Take the first discount if multiple exist
    promoOffer += ` + ${discount.priceString} for ${
      discount.periodNumberOfUnits * discount.cycles
    } ${discount.periodUnit.toLowerCase()}`
  }
  if (promoOffer) {
    features.push(promoOffer)
  }

  // features.push(`Subscription Period: ${derivePeriodUnit(product.subscriptionPeriod)}`)

  return features
}
