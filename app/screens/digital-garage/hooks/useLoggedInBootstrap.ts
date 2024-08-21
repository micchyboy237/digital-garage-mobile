import { useInitializeRevenueCat } from "app/screens/subscription/useInitializeRevenueCat"
import { useEffect } from "react"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

interface LoggedInBootstrapResult {
  isReady: boolean
}

export function useLoggedInBootstrap(onReady?: () => void): LoggedInBootstrapResult {
  const { initialized: initializedRevenueCat } = useInitializeRevenueCat()

  const isReady = initializedRevenueCat

  useEffect(() => {
    if (isReady && onReady) {
      onReady()
    }
  }, [isReady])

  return {
    isReady,
  }
}
