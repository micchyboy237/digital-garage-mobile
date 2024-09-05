import { User } from "app/models/user/User"
import { trpc } from "app/services/api"

export const useUser = (): User | undefined => {
  const user = trpc.me.getUser.useQuery()
  return user.data
}
