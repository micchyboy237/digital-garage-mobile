import { useUserId } from "app/models/hooks/useUserId"
import { Profile } from "app/models/profile/Profile"
import { trpc } from "app/services/api"

export const useProfile = (): Profile | undefined => {
  // const { authenticationStore } = useStores()
  const userId = useUserId()
  const profile = trpc.admin.profile.findUniqueProfile.useQuery({
    where: { userId },
  })
  return profile.data
}
