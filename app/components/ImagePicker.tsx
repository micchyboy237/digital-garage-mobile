import { Ionicons } from "@expo/vector-icons"
import { pickImage } from "app/utils/filePicker"
import * as ImageManipulator from "expo-image-manipulator" // Import ImageManipulator
import * as ExpoImagePicker from "expo-image-picker"
import React, { useEffect, useState } from "react"
import { Image, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../theme"

export interface ImagePickerProps {
  onImageSelected?: (file: ExpoImagePicker.ImagePickerAsset) => void
  containerStyle?: ViewStyle
  children?: React.ReactNode
  size?: number
  value?: string | null
  icon?: keyof typeof Ionicons.glyphMap
  fullWidth?: boolean // New prop for full width variant
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  containerStyle,
  children,
  size = 100,
  value = null,
  icon = "person",
  fullWidth = false, // Default value for full width variant
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(value)

  useEffect(() => {
    setSelectedImage(value)
  }, [value])

  const handlePickImage = async () => {
    const fileAsset = await pickImage()

    if (fileAsset) {
      const compressedImage = await compressImage(fileAsset.uri) // Compress the image
      setSelectedImage(compressedImage.uri)
      onImageSelected?.(compressedImage)
    }
  }

  const compressImage = async (uri: string) => {
    try {
      // Compress the image without losing quality
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [], // No resize or rotation actions, only compression
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }, // Adjust compress value to balance quality and size
      )
      return result
    } catch (error) {
      console.error("Error compressing image:", error)
      return { uri } // Return original if compression fails
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePickImage}
      style={[styles.container, containerStyle, fullWidth && styles.fullWidthContainer]}
    >
      <View style={[fullWidth && { width: "100%" }]}>
        <View
          style={[
            styles.placeholder,
            { width: size, height: size, borderRadius: size / 2 },
            fullWidth && { width: "100%", height: size, borderRadius: 0 },
          ]}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={[
                styles.image,
                { width: size, height: size, borderRadius: size / 2 },
                fullWidth && {
                  width: "100%",
                  height: size,
                  borderRadius: 0,
                  resizeMode: "cover",
                },
              ]}
            />
          ) : (
            <Ionicons name={icon} size={size / 2} color="white" />
          )}
        </View>
      </View>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  } as ViewStyle,
  fullWidthContainer: {
    width: "100%",
  } as ViewStyle,
  touchable: {
    position: "relative",
  } as ViewStyle,
  image: {} as ImageStyle,
  fullWidthImage: {
    width: "100%",
    height: "auto",
    borderRadius: 0,
  } as ImageStyle,
  placeholder: {
    backgroundColor: colors.textDim,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  fullWidthPlaceholder: {
    width: "100%",
    height: "auto",
    borderRadius: 0,
  } as ViewStyle,
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.palette.neutral100,
    borderRadius: 12,
    padding: 4,
  } as ViewStyle,
})
