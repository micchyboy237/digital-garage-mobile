import { Image } from "react-native"

const cache = new Map()

const fetchImageSize = (source: any) => {
  if (cache.has(source.uri)) {
    return cache.get(source.uri)
  }

  const promise = new Promise<{ width: number; height: number }>((resolve, reject) => {
    if (typeof source === "number") {
      // Handle local images
      const { width, height } = Image.resolveAssetSource(source)
      resolve({ width, height })
    } else {
      // Handle remote images
      Image.getSize(
        source.uri,
        (width, height) => resolve({ width, height }),
        (error) => reject(error),
      )
    }
  }).catch((error) => {
    console.error("Failed to fetch image size:", error)
    throw error // Re-throw the error to ensure status transitions to 'error'
  })

  cache.set(source.uri, promise)
  return promise
}

const createImageResource = (source: any) => {
  let status = "pending"
  let result: { width: number; height: number }

  const suspender = fetchImageSize(source).then(
    (r) => {
      status = "success"
      result = r
    },
    (e) => {
      status = "error"
      result = e
    },
  )

  return {
    read() {
      console.log("createImageResource read:", status)
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result
      }
    },
  }
}

export { createImageResource, fetchImageSize }
export default cache
