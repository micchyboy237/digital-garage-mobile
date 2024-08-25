import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

export const useLogout = () => {
  const {
    authenticationStore: { logout },
  } = useStores()
  const navigation = useNavigation()

  const handleLogout = () => {
    logout()
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }

  return handleLogout
}
