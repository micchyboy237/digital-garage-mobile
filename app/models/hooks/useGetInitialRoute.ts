import { useUser } from "app/models/hooks/useUser"

export const useGetInitialRoute = (): string | undefined => {
  const user = useUser()
  let initialRoute = "Login"
  if (user?.accountStatus) {
    if (user.accountStatus === "ONBOARDING") {
      initialRoute = "Onboarding"
    } else if (user.accountStatus === "SELECT_SUBSCRIPTION") {
      initialRoute = "Subscription"
    } else if (user.accountStatus === "ACTIVE") {
      initialRoute = "User"
    } else {
      // Log out user if account status is not recognized
    }
  }
  return initialRoute
}
