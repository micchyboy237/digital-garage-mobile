import Config from "app/config"
import { rootStore } from "app/models"
import superjson from "superjson"

// Helper function to create headers without Content-Type for FormData
const createHeaders = (token: string | null, isFormData: boolean = false) => {
  const headers: Record<string, string> = {}
  if (!isFormData) {
    headers["Content-Type"] = "application/json"
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

// Generic API client function with SuperJSON transform
export const apiClient = async (endpoint: string, method: "POST" | "GET", formData?: FormData) => {
  try {
    const token = rootStore.authenticationStore.authSession?.token
    const headers = createHeaders(token, !!formData)

    // If formData is provided, send it directly; otherwise, serialize the body
    const body = formData || undefined

    const response = await fetch(`${Config.API_HOST}${endpoint}`, {
      method,
      body,
      headers,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    // Deserialize response data
    const jsonData = await response.json()

    // Transform the JSON response using SuperJSON
    const transformedData = superjson.deserialize(jsonData)

    return transformedData
  } catch (error) {
    console.error(`Error calling API ${endpoint}:`, error)
    throw error
  }
}
