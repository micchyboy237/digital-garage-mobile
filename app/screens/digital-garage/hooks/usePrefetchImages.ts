import { Asset } from "expo-asset"
import { useEffect, useState } from "react"
import { Image } from "react-native"

type ImageSource = number | string

const imageSources: ImageSource[] = [
  // Remote images
  // "https://example.com/remote-image.png",
]

export const usePrefetchImages = (): boolean => {
  const [areImagesPrefetched, setAreImagesPrefetched] = useState(false)

  useEffect(() => {
    async function prefetchImages() {
      const prefetchPromises = imageSources.map((source) => {
        if (typeof source === "string") {
          // It's a remote image, use Image.prefetch
          return Image.prefetch(source)
        } else {
          // It's a local image, use Asset to cache it
          return Asset.fromModule(source).downloadAsync()
        }
      })

      await Promise.all(prefetchPromises)
      setAreImagesPrefetched(true)
    }

    prefetchImages()
  }, [])

  return areImagesPrefetched
}
