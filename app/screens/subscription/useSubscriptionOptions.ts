import { PeriodUnit, SubscriptionOptionPlan } from "app/screens/subscription/types"
import { useRevenueCat } from "app/screens/subscription/useRevenueCat"
import {
  currencySymbolMap,
  deriveFeatures,
  derivePeriodUnit,
  subscriptionPeriodAbbreviationMap,
} from "app/screens/subscription/utils"
import { useEffect, useState } from "react"

export const useSubscriptionOptions = (): SubscriptionOptionPlan[] => {
  const [subscriptionOptions, setSubscriptionOptions] = useState<SubscriptionOptionPlan[]>([])
  const revenueCat = useRevenueCat()

  // Clear active subscription
  // const { authenticationStore } = useStores()
  // useEffect(() => {
  //   authenticationStore.setAuthSubscription(null)
  //   authenticationStore.clearAuthPayments()
  //   revenueCat.refundPurchase()
  // }, [])

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
