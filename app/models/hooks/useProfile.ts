import { useUser } from "app/models/hooks/useUser"
import { MediaFile } from "app/models/media-file/MediaFile"

interface Profile {
  firstName?: string | null
  lastName?: string | null
  location?: string | null
  displayPicture?: MediaFile | null
}

export const useProfile = (): Profile => {
  const user = useUser()
  const profile = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    location: user?.location,
    displayPicture: user?.displayPicture,
  }

  return profile
}
