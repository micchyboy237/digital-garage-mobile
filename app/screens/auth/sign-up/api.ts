import { Profile } from "app/models/profile/Profile"
import { User } from "app/models/user/User"
import { clientUtils } from "app/services/api"

export const fetchExistingUser = async (email: string): Promise<User | null | void> => {
  try {
    console.log("Fetching existing user...")
    const existingUser = await clientUtils.admin.user.findUniqueUser.ensureData({
      where: { email },
      include: { profile: true, sessions: true, subscription: true },
    })
    console.log("Existing user:", existingUser)
    return existingUser
  } catch (error) {
    console.error("Error fetching existing user:", error)
  }
}

export const fetchExistingProfile = async (userId: string): Promise<Profile | null | void> => {
  try {
    console.log("Fetching existing profile...")
    const existingProfile = await clientUtils.admin.profile.findUniqueProfile.ensureData({
      where: { userId },
    })
    console.log("Existing profile:", existingProfile)
    return existingProfile
  } catch (error) {
    console.error("Error fetching existing profile:", error)
  }
}
