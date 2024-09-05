import * as DocumentPicker from "expo-document-picker"
import * as ExpoImagePicker from "expo-image-picker"

export const pickImage = async (
  options?: ExpoImagePicker.ImagePickerOptions,
): Promise<ExpoImagePicker.ImagePickerAsset | null> => {
  const result = await ExpoImagePicker.launchImageLibraryAsync({
    mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    allowsEditing: false,
    quality: 1,
    ...options,
  })

  if (!result.canceled) {
    const fileAsset = result.assets[0]
    return fileAsset
  }

  return null
}

export const pickVideo = async (
  options?: ExpoImagePicker.ImagePickerOptions,
): Promise<ExpoImagePicker.ImagePickerAsset | null> => {
  const result = await ExpoImagePicker.launchImageLibraryAsync({
    mediaTypes: ExpoImagePicker.MediaTypeOptions.Videos,
    allowsMultipleSelection: false,
    allowsEditing: false,
    quality: 1,
    ...options,
  })

  if (!result.canceled) {
    const fileAsset = result.assets[0]
    return fileAsset
  }

  return null
}

export const pickPdf = async (): Promise<DocumentPicker.DocumentPickerAsset | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["application/pdf"],
    multiple: false,
    copyToCacheDirectory: true,
  })

  if (!result.canceled) {
    const singleAsset = result.assets[0]

    return singleAsset
  }

  return null
}
