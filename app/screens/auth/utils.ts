import * as Crypto from "expo-crypto"
import * as Device from "expo-device"

export const generateFingerprint = async (userId?: string): Promise<string | void> => {
  if (!userId) {
    throw new Error("userId is required to generate a fingerprint")
  }

  try {
    // Gather device-specific data
    const deviceInfo = `${Device.osBuildId}-${Device.modelName}-${Device.osVersion}`

    // Combine userId and deviceInfo
    const dataToHash = `${userId}-${deviceInfo}`

    // Generate a secure hash using expo-crypto
    const fingerprintHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      dataToHash,
    )

    // Save the fingerprint data
    console.log("Fingerprint generated:", fingerprintHash)
    return fingerprintHash
  } catch (error) {
    console.error("Failed to generate fingerprint:", error)
  }
}
