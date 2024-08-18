import { profile1, profile2, profile3 } from "app/models/profile/Profile.test"
import { ProfileStoreModel } from "app/models/profile/ProfileStore"
import {
  subscription1,
  subscription2,
  subscription3,
} from "app/models/subscription/Subscription.test"
import { UserStoreModel } from "app/models/user/UserStore"
import { UserModel } from "./User"

const userStore = UserStoreModel.create({ users: [] })
const profileStore = ProfileStoreModel.create({ profiles: [] })

// Add the profile to the profile store
profileStore.addProfile(profile1)

// Create a user and reference the profile by its ID
export const user1 = UserModel.create({
  id: "user1",
  email: "user1@example.com",
  firebaseUid: "user1FirebaseUid",
  provider: "EMAIL_PASSWORD",
  profile: profile1.id, // Reference to the profile by ID
  subscription: subscription1.id,
  accountStatus: "ONBOARDING",
})

export const user2 = UserModel.create({
  id: "user2",
  email: "user2@example.com",
  firebaseUid: "user2FirebaseUid",
  provider: "EMAIL_PASSWORD",
  profile: profile2.id, // Reference to the profile by ID
  subscription: subscription2.id,
  accountStatus: "SELECT_SUBSCRIPTION",
})

export const user3 = UserModel.create({
  id: "user3",
  email: "user3@example.com",
  firebaseUid: "user3FirebaseUid",
  provider: "EMAIL_PASSWORD",
  profile: profile3.id, // Reference to the profile by ID
  subscription: subscription3.id,
  accountStatus: "ACTIVE",
})

// Add the user to the user store
userStore.addUser(user1)
userStore.addUser(user2)

describe("User 1", () => {
  it("user model has correct data", () => {
    expect(user1.id).toBe("user1")
    expect(user1.email).toBe("user1@example.com")
    expect(user1.firebaseUid).toBe("user1FirebaseUid")
    expect(user1.provider).toBe("EMAIL_PASSWORD")
  })

  it("profile model has correct data", () => {
    if (user1.profile) {
      expect(user1.profile.id).toBe("profile1")
      expect(user1.profile.firstName).toBe("User")
      expect(user1.profile.lastName).toBe("1")
      expect(user1.profile.profilePicture).toBe("https://example.com/profile1.jpg")
      expect(user1.profile.location).toBe("New York")
      expect(user1.profile.userId).toBe("user1")
      expect(user1.profile.accountStatus).toBe("ACTIVE")
    } else {
      fail("User profile is undefined")
    }
  })
})

describe("User 2", () => {
  it("user model has correct data", () => {
    expect(user2.id).toBe("user2")
    expect(user2.email).toBe("user2@example.com")
    expect(user2.firebaseUid).toBe("user2FirebaseUid")
    expect(user2.provider).toBe("EMAIL_PASSWORD")
  })

  it("profile model has correct data", () => {
    if (user2.profile) {
      expect(user2.profile.id).toBe("profile2")
      expect(user2.profile.firstName).toBe("User")
      expect(user2.profile.lastName).toBe("2")
      expect(user2.profile.profilePicture).toBe("https://example.com/profile2jpg")
      expect(user2.profile.location).toBe("Los Angeles")
      expect(user2.profile.userId).toBe("user2")
      expect(user2.profile.accountStatus).toBe("ACTIVE")
    } else {
      fail("User profile is undefined")
    }
  })
})
