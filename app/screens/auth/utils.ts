import * as Crypto from "expo-crypto"
import * as Device from "expo-device"

export const generateUUID = async (): Promise<string> => {
  const randomBytes = await Crypto.getRandomBytes(16)

  // Set the version to 4 (UUIDv4) by setting bits 4-7 of the 7th byte to 0100
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40
  // Set the variant to 2 by setting bits 6-7 of the 9th byte to 10
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80

  const hexArray = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, "0"))

  // Join the array into a UUID format string
  return `${hexArray.slice(0, 4).join("")}-${hexArray.slice(4, 6).join("")}-${hexArray
    .slice(6, 8)
    .join("")}-${hexArray.slice(8, 10).join("")}-${hexArray.slice(10, 16).join("")}`
}

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
