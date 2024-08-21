import { PeriodUnit, SubscriptionOptionPlan } from "app/screens/subscription/types"
import { useRevenueCat } from "app/screens/subscription/useRevenueCat"
import { useEffect, useState } from "react"
import { PurchasesStoreProduct } from "react-native-purchases"

const currencySymbolMap: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  // Add other currency symbols as needed
}

const subscriptionPeriodAbbreviationMap: Record<PeriodUnit, string> = {
  [PeriodUnit.Day]: "day",
  [PeriodUnit.Week]: "wk",
  [PeriodUnit.Month]: "mo",
  [PeriodUnit.Year]: "yr",
}

const derivePeriodUnit = (subscriptionPeriod: string): PeriodUnit => {
  if (subscriptionPeriod.includes("M")) return PeriodUnit.Month
  if (subscriptionPeriod.includes("Y")) return PeriodUnit.Year
  return PeriodUnit.Week
}

const deriveFeatures = (product: PurchasesStoreProduct): string[] => {
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

export const useSubscriptionOptions = (): SubscriptionOptionPlan[] => {
  const [subscriptionOptions, setSubscriptionOptions] = useState<SubscriptionOptionPlan[]>([])
  const revenueCat = useRevenueCat()

  useEffect(() => {
    const options = [
      {
        id: "free",
        plan: "free",
        title: "Free Plan",
        currencyCode: currencySymbolMap.GBP,
        originalPrice: "0.00 / mo.",
        subscriptionPeriodUnit: PeriodUnit.Month,
        features: ["Up to only 1 vehicle", "Limited access"],
      },
    ]

    if (revenueCat.packages.length) {
      const paidOptions = revenueCat.packages.map((item) => {
        const product = item.product
        return {
          id: product.identifier,
          plan: item.identifier,
          title: item.identifier,
          currencyCode: currencySymbolMap[product.currencyCode],
          originalPrice: `${product.price.toFixed(2)} / ${
            subscriptionPeriodAbbreviationMap[
              derivePeriodUnit(product.subscriptionPeriod) as PeriodUnit
            ]
          }`,
          subscriptionPeriodUnit: derivePeriodUnit(product.subscriptionPeriod),
          features: deriveFeatures(product),
        }
      })
      options.push(...paidOptions)
    }

    setSubscriptionOptions(options)
  }, [revenueCat.packages])

  return subscriptionOptions
}
