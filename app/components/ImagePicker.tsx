import { Ionicons } from "@expo/vector-icons"
import * as ExpoImagePicker from "expo-image-picker"
import React, { useEffect, useState } from "react"
import { Image, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"

interface ImagePickerProps {
  onImageSelected: (uri: string) => void
  containerStyle?: ViewStyle
  children?: React.ReactNode
  size?: number
  value?: string | null
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  containerStyle,
  children,
  size = 100,
  value = null,
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
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={pickImage} style={styles.touchable}>
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
            />
          ) : (
            <Ionicons name="person" size={size / 2} color="white" />
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
    marginBottom: spacing.md,
  } as ViewStyle,
  touchable: {
    position: "relative",
  } as ViewStyle,
  image: {
    marginBottom: spacing.sm,
  } as ImageStyle,
  placeholder: {
    backgroundColor: colors.textDim,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
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
