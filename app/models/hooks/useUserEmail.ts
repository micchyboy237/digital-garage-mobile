import { useUser } from "app/models/hooks/useUser"

export const useUserEmail = (): string | undefined => {
  const user = useUser()
  return user?.email
}
