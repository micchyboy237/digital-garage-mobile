import { VehicleDetails } from "app/types"

export type ApiResponseDvla = Omit<VehicleDetails, "id" | "createdAt" | "updatedAt">
