import { ApiResponseDvla } from "app/screens/digital-garage/screens/dashboard/vehicle-form/types"
import { apiClient } from "app/services/api/apiClient"

// Specific function for uploading vehicle details using the generic API client
export const uploadVehicleDetails = async (formData: FormData) => {
  // return await apiClient("/upload/uploadVehicleDetails", "POST", formData)
  return await apiClient("/trpc/me.addVehicle", "POST", formData)
}

// Specific function for uploading profile details using the generic API client
export const uploadProfile = async (formData: FormData) => {
  return await apiClient("/upload/uploadProfile", "POST", formData)
}

export const fetchVehicleData = async ({
  registrationNumber,
}: {
  registrationNumber: string
}): Promise<ApiResponseDvla> => {
  const response = await fetch(
    "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
    {
      method: "POST",
      headers: {
        "x-api-key": "1x9gAFNoBFkL9lMpL07K14LSEFPkuvr20bzcjAd6",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registrationNumber }),
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle data")
  }

  const data = (await response.json()) as ApiResponseDvla
  return data
}
