import { useUser } from "app/models/hooks/useUser"
import { useEffect, useState } from "react"

export const useGetInitialRoute = (): string | undefined => {
  const user = useUser()
  const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined)

  console.log("user.accountStatus:", user?.accountStatus)

  useEffect(() => {
    if (user?.accountStatus) {
      if (user.accountStatus === "ONBOARDING") {
        setInitialRoute("Onboarding")
      } else if (user.accountStatus === "SELECT_SUBSCRIPTION") {
        setInitialRoute("Subscription")
      } else if (user.accountStatus === "ACTIVE") {
        setInitialRoute("User")
      } else {
        // Log out user if account status is not recognized
      }
    }
  }, [user?.accountStatus])

  return initialRoute
}
