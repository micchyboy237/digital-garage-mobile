import React, { useEffect, useState, useTransition } from "react"
import { Image, ImageProps, ImageStyle, StyleProp } from "react-native"

type AtLeastOne<T, U = keyof T> = U extends keyof T ? Omit<T, U> & Required<Pick<T, U>> : never

interface AspectRatioImageProps extends Omit<ImageProps, "style"> {
  source: any
  width?: number
  height?: number
  style?: StyleProp<ImageStyle>
}

const loadImage = (source: any): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (typeof source === "number") {
      // Handle local images (e.g., require())
      const { width, height } = Image.resolveAssetSource(source)
      resolve({ width, height })
    } else {
      // Handle remote images
      Image.getSize(
        source.uri,
        (width, height) => {
          resolve({ width, height })
        },
        reject,
      )
    }
  })
}

export const AspectRatioImage: React.FC<AtLeastOne<AspectRatioImageProps, "width" | "height">> = ({
  source,
  width,
  height,
  style,
  ...rest
}) => {
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined)
  const [calculatedWidth, setCalculatedWidth] = useState<number | null>(null)
  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      loadImage(source).then(({ width: naturalWidth, height: naturalHeight }) => {
        setAspectRatio(naturalWidth / naturalHeight)
      })
    })
  }, [source])

  useEffect(() => {
    if (width && aspectRatio) {
      setCalculatedHeight(width / aspectRatio)
    } else if (height && aspectRatio) {
      setCalculatedWidth(height * aspectRatio)
    }
  }, [width, height, aspectRatio])

  const finalWidth = width ?? calculatedWidth
  const finalHeight = height ?? calculatedHeight

  // Only render the Image component when both width and height are calculated
  if (!finalWidth || !finalHeight) {
    return null
  }

  return (
    <Image source={source} style={[style, { width: finalWidth, height: finalHeight }]} {...rest} />
  )
}
