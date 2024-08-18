import { useInitialRootStore } from "app/models"
import { useNavigationPersistence } from "app/navigators"
import { customFontsToLoad } from "app/theme"
import * as storage from "app/utils/storage"
import { useFonts } from "expo-font"
import { useEffect } from "react"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

interface BootstrapResult {
  isReady: boolean
  fontLoadError: Error | null
  initialNavigationState: any
  onNavigationStateChange: (state: any) => void
}

export function useBootstrap(onReady?: () => void): BootstrapResult {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const { rehydrated } = useInitialRootStore()

  const isReady = rehydrated && areFontsLoaded && isNavigationStateRestored

  useEffect(() => {
    if (isReady && onReady) {
      onReady()
    }
  }, [isReady])

  return {
    isReady,
    fontLoadError,
    initialNavigationState,
    onNavigationStateChange,
  }
}
