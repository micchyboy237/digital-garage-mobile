import { Ionicons } from "@expo/vector-icons"
import * as ExpoImagePicker from "expo-image-picker"
import React, { useEffect, useState } from "react"
import { Image, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../theme"

interface ImagePickerProps {
  onImageSelected: (uri: string) => void
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

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setSelectedImage(uri)
      onImageSelected(uri)
    }
  }

  return (
    <View style={[styles.container, containerStyle, fullWidth && styles.fullWidthContainer]}>
      <TouchableOpacity
        onPress={pickImage}
        style={[
          styles.touchable,
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
      </TouchableOpacity>

      {children}
    </View>
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
