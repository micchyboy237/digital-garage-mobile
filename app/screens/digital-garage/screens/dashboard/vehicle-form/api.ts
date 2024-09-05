import { apiClient } from "app/services/api/apiClient"

// Specific function for uploading vehicle details using the generic API client
export const uploadVehicleDetails = async (formData: FormData) => {
  return await apiClient("/upload/uploadVehicleDetails", "POST", formData)
}

// Specific function for uploading profile details using the generic API client
export const uploadProfile = async (formData: FormData) => {
  return await apiClient("/upload/uploadProfile", "POST", formData)
}
