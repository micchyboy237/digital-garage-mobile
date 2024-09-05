import { Ionicons } from "@expo/vector-icons"
import { pickImage } from "app/utils/filePicker"
import * as ExpoImagePicker from "expo-image-picker"
import React, { useEffect, useState } from "react"
import { Image, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../theme"

interface ImagePickerProps {
  onImageSelected: (file: ExpoImagePicker.ImagePickerAsset) => void
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
      setSelectedImage(fileAsset.uri)
      onImageSelected(fileAsset)
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePickImage}
      style={[styles.container, containerStyle, fullWidth && styles.fullWidthContainer]}
    >
      <View
        style={[
          fullWidth && { width: "100%" }, // Ensure touchable takes full width
        ]}
      >
        <View
          style={[
            styles.placeholder,
            { width: size, height: size, borderRadius: size / 2 },
            fullWidth && { width: "100%", height: size, borderRadius: 0 }, // Ensure aspect ratio is preserved
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
                  // aspectRatio: 1,
                  borderRadius: 0,
                  resizeMode: "cover",
                }, // Cover to ensure aspect ratio
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
