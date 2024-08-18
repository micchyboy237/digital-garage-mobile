import { ProfileModel } from "./Profile"

export const profile1 = ProfileModel.create({
  id: "profile1",
  firstName: "User",
  lastName: "1",
  profilePicture: "https://example.com/profile1.jpg",
  location: "New York",
  userId: "user1",
})

export const profile2 = ProfileModel.create({
  id: "profile2",
  firstName: "User",
  lastName: "2",
  profilePicture: "https://example.com/profile2jpg",
  location: "Los Angeles",
  userId: "user2",
})

export const profile3 = ProfileModel.create({
  id: "profile3",
  firstName: "User",
  lastName: "3",
  profilePicture: "https://example.com/profile3.jpg",
  location: "Chicago",
  userId: "user3",
})

test("profile model has correct data", () => {
  expect(profile1.id).toBe("profile1")
  expect(profile1.firstName).toBe("User")
})
