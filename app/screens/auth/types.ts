import { Session, User } from "app/models/models"

export interface UseAuthArgs {
  onSignIn?: (state: { user: User; session: Session }) => void
  onSignOut?: (user: User | null) => void
}

export interface UseAuthReturn {
  loading: boolean
  user: User | null
  session: Session | null
  signInAsync: () => Promise<{
    user: User | null
    session: Session | null
  }>
  signOutAsync: () => Promise<void>
}
