import * as Device from "expo-device"
import { useEffect, useState } from "react"

export const useDeviceFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  useEffect(() => {
    const generateFingerprint = async () => {
      // Combine constants that are unlikely to change across OS versions
      const uniqueString = `${Device.modelId || ""}-${Device.deviceName || ""}-${
        Device.brand || ""
      }-${Device.manufacturer || ""}-${Device.modelName || ""}-${Device.isDevice}`

      setFingerprint(uniqueString)
    }

    generateFingerprint()
  }, [])

  return fingerprint
}
