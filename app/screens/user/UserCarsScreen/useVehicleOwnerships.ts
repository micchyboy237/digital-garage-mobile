import { trpc } from "app/services/api"
import { VehicleOwnership } from "app/types"
import { useEffect, useState } from "react"

interface UseVehicleOwnershipsReturn {
  currentOwnerships: VehicleOwnership[]
  pastOwnerships: VehicleOwnership[]
}

export const useVehicleOwnerships = (): UseVehicleOwnershipsReturn => {
  const myVehicleOwnerships = trpc.me.getVehicleOwnerships.useQuery()

  const [currentOwnerships, setCurrentOwnerships] = useState<VehicleOwnership[]>([])
  const [pastOwnerships, setPastOwnerships] = useState<VehicleOwnership[]>([])

  useEffect(() => {
    if (myVehicleOwnerships.data) {
      const currentOwnerships = myVehicleOwnerships.data.filter(
        (ownership: VehicleOwnership) => ownership.isCurrentOwner,
      )
      const pastOwnerships = myVehicleOwnerships.data.filter(
        (ownership: VehicleOwnership) => !ownership.isCurrentOwner,
      )

      setCurrentOwnerships(currentOwnerships)
      setPastOwnerships(pastOwnerships)
    }
  }, [myVehicleOwnerships.data])

  return {
    currentOwnerships,
    pastOwnerships,
  }
}
