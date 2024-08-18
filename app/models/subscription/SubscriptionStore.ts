
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { Subscription, SubscriptionModel } from "./Subscription"

export const SubscriptionStoreModel = types
  .model("SubscriptionStore")
  .props({
    subscriptions: types.array(SubscriptionModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addSubscription(subscription: Subscription) {
      store.subscriptions.push(subscription)
    },
    removeSubscription(subscription: Subscription) {
      store.subscriptions.remove(subscription)
    },
  }))

export interface SubscriptionStore extends Instance<typeof SubscriptionStoreModel> {}
export interface SubscriptionStoreSnapshot extends SnapshotOut<typeof SubscriptionStoreModel> {}
