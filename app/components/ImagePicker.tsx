// digital-garage/packages/api/src/components/ImagePicker.tsx

import { Ionicons } from "@expo/vector-icons"
import * as ExpoImagePicker from "expo-image-picker"
import React, { useState } from "react"
import { Image, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"

interface ImagePickerProps {
  onImageSelected: (uri: string) => void
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.touchable}>
        <View style={styles.placeholder}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Ionicons name="person" size={54} color="white" />
          )}
        </View>
      </TouchableOpacity>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.sm,
  } as ImageStyle,
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
