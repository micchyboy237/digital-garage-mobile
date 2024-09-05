import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const VehicleDetailsModel = types
  .model("VehicleDetails")
  .props({
    id: types.maybe(types.identifier),
    fromApi: types.optional(types.boolean, true),
    registrationNumber: types.string,
    make: types.string,
    model: types.string,
    colour: types.string,
    yearOfManufacture: types.number,
    taxStatus: types.string,
    taxDueDate: types.Date,
    motStatus: types.string,
    motExpiryDate: types.maybeNull(types.Date),
    engineCapacity: types.maybeNull(types.number),
    co2Emissions: types.maybeNull(types.number),
    fuelType: types.maybeNull(types.string),
    markedForExport: types.maybeNull(types.boolean),
    typeApproval: types.maybeNull(types.string),
    wheelplan: types.maybeNull(types.string),
    artEndDate: types.maybeNull(types.Date),
    monthOfFirstRegistration: types.maybeNull(types.Date),
    euroStatus: types.maybeNull(types.string),
    dateOfLastV5CIssued: types.maybeNull(types.Date),
    realDrivingEmissions: types.maybeNull(types.string),
    revenueWeight: types.maybeNull(types.number),
    createdAt: types.optional(types.Date, () => new Date()),
    updatedAt: types.optional(types.Date, () => new Date()),
  })
  .views((self) => ({
    get isTaxDueDate() {
      return self.taxStatus !== "Taxed"
    },
    get isMOTExpiryDate() {
      return self.motStatus !== "Valid"
    },
  }))
  .actions((self) => ({
    setMotStatus(status: string) {
      self.motStatus = status
      if (!self.isMOTExpiryDate) {
        self.motExpiryDate = null
      }
    },
    setMotExpiryDate(date: Date | null) {
      if (self.isMOTExpiryDate) {
        self.motExpiryDate = date
      } else {
        self.motExpiryDate = null
      }
    },
  }))

export interface VehicleDetails extends Instance<typeof VehicleDetailsModel> {}
export interface VehicleDetailsSnapshotOut extends SnapshotOut<typeof VehicleDetailsModel> {}
export interface VehicleDetailsSnapshotIn extends SnapshotIn<typeof VehicleDetailsModel> {}
