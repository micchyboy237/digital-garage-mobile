import { VehicleOwnership } from "app/types"
import React from "react"
import { ScrollView, Text, View } from "react-native"

interface OverviewRouteProps {
  vehicleOwnership: VehicleOwnership
}

const OverviewRoute: React.FC<OverviewRouteProps> = ({ vehicleOwnership }) => {
  const {
    description,
    startDate,
    endDate,
    isCurrentOwner,
    isTemporaryOwner,
    canEditDocuments,
    vehicle,
  } = vehicleOwnership
  const { make, model, details } = vehicle

  return (
    <ScrollView>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Vehicle Overview
      </Text>
      <View>
        <Text>Description: {description}</Text>
        <Text>Start Date: {startDate?.toDateString()}</Text>
        <Text>End Date: {endDate?.toDateString()}</Text>
        <Text>Current Owner: {isCurrentOwner ? "Yes" : "No"}</Text>
        <Text>Temporary Owner: {isTemporaryOwner ? "Yes" : "No"}</Text>
        <Text>Can Edit Documents: {canEditDocuments ? "Yes" : "No"}</Text>
      </View>

      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Technical</Text>
      <View>
        <Text>Make: {make}</Text>
        <Text>Model: {model}</Text>
        <Text>Registration Number: {details.registrationNumber}</Text>
        <Text>Tax Status: {details.taxStatus}</Text>
        <Text>Tax Due Date: {details.taxDueDate.toDateString()}</Text>
        <Text>MOT Status: {details.motStatus}</Text>
        <Text>Year of Manufacture: {details.yearOfManufacture}</Text>
        <Text>Engine Capacity: {details.engineCapacity} cc</Text>
        <Text>CO2 Emissions: {details.co2Emissions} g/km</Text>
        <Text>Fuel Type: {details.fuelType}</Text>
        <Text>Marked for Export: {details.markedForExport ? "Yes" : "No"}</Text>
        <Text>Colour: {details.colour}</Text>
        <Text>Type Approval: {details.typeApproval}</Text>
        <Text>Euro Status: {details.euroStatus}</Text>
        <Text>Date of Last V5C Issued: {details.dateOfLastV5CIssued.toDateString()}</Text>
        <Text>MOT Expiry Date: {details.motExpiryDate.toDateString()}</Text>
        <Text>Wheelplan: {details.wheelplan}</Text>
        <Text>Month of First Registration: {details.monthOfFirstRegistration.toDateString()}</Text>
      </View>
    </ScrollView>
  )
}

export default OverviewRoute
