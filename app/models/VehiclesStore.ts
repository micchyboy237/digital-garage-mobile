import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Vehicle, VehicleModel } from "./Vehicle"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const VehicleStoreModel = types
  .model("VehicleStore")
  .props({
    vehicles: types.array(VehicleModel),
    favorites: types.array(types.reference(VehicleModel)),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchVehicles() {
      const response = await api.getVehicles()
      if (response.kind === "ok") {
        store.setProp("vehicles", response.vehicles)
      } else {
        console.error(`Error fetching vehicles: ${JSON.stringify(response)}`)
      }
    },
    addFavorite(vehicle: Vehicle) {
      store.favorites.push(vehicle)
    },
    removeFavorite(vehicle: Vehicle) {
      store.favorites.remove(vehicle)
    },
  }))
  .views((store) => ({
    get vehiclesForList() {
      return store.favoritesOnly ? store.favorites : store.vehicles
    },

    hasFavorite(vehicle: Vehicle) {
      return store.favorites.includes(vehicle)
    },
  }))
  .actions((store) => ({
    toggleFavorite(vehicle: Vehicle) {
      if (store.hasFavorite(vehicle)) {
        store.removeFavorite(vehicle)
      } else {
        store.addFavorite(vehicle)
      }
    },
  }))

export interface VehicleStore extends Instance<typeof VehicleStoreModel> {}
export interface VehicleStoreSnapshot extends SnapshotOut<typeof VehicleStoreModel> {}

// @demo remove-file
