import { useRevenueCat } from "app/screens/subscription/useRevenueCat"
import { useEffect, useState } from "react"

interface SubscriptionOption {
  id: string
  name: string
  price: string
  description: string
}

export const useSubscriptionOptions = (): SubscriptionOption[] => {
  const [subscriptionOptions, setSubscriptionOptions] = useState<SubscriptionOption[]>([])
  const revenueCat = useRevenueCat()

  useEffect(() => {
    if (revenueCat.currentOffering) {
      console.log("Current offering:\n", JSON.stringify(revenueCat.currentOffering, null, 2))
    }
    if (revenueCat.packages.length) {
      console.log("Packages:\n", JSON.stringify(revenueCat.packages, null, 2))
      // Convert RevenueCat packages to SubscriptionOptions
      setSubscriptionOptions(
        revenueCat.packages.map((item) => ({
          id: item.identifier,
          name: item.product.title,
          price: item.product.price.toString(),
          description: item.product.description,
        })),
      )
    }
  }, [revenueCat.packages])

  console.log("Subscription options:\n", JSON.stringify(subscriptionOptions, null, 2))

  return subscriptionOptions
}
