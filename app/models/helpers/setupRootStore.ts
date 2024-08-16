import { applySnapshot, IDisposer, onSnapshot } from "mobx-state-tree"
import * as storage from "../../utils/storage"
import { RootStore, RootStoreSnapshot } from "../RootStore"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root-v1"

/**
 * Setup the root state.
 */
let _disposer: IDisposer | undefined
export async function setupRootStore(rootStore: RootStore) {
  let restoredState: RootStoreSnapshot | undefined | null

  try {
    // Load the last known state from AsyncStorage
    const storedState = await storage.load(ROOT_STATE_STORAGE_KEY)
    if (storedState) {
      restoredState = JSON.parse(storedState) as RootStoreSnapshot

      // Modify the snapshot to ensure references contain only IDs
      if (restoredState && restoredState.authenticationStore?.authUser) {
        restoredState.authenticationStore.authUser = restoredState.authenticationStore.authUser
      }

      if (restoredState && restoredState.authenticationStore?.authSession) {
        restoredState.authenticationStore.authSession =
          restoredState.authenticationStore.authSession
      }

      // Apply the modified snapshot
      applySnapshot(rootStore, restoredState)
    }
  } catch (e) {
    if (__DEV__) {
      console.error("Failed to load state:", e)
    }
  }

  if (_disposer) _disposer()

  _disposer = onSnapshot(rootStore, (snapshot) => {
    storage.save(ROOT_STATE_STORAGE_KEY, JSON.stringify(snapshot))
  })

  const unsubscribe = () => {
    _disposer?.()
    _disposer = undefined
  }

  return { rootStore, restoredState, unsubscribe }
}
