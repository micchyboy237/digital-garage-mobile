import { Text, TextField } from "app/components"
import { VehicleDetails } from "app/types"
import React, { useState } from "react"
import { Button, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

interface AddVehicleFormProps {
  user: any
  onAddVehicle: (make: string, model: string, details: VehicleDetails) => void
  onClose: () => void
}

type VehicleData =
  | (Partial<VehicleDetails> & {
      make: string
      model: string
    })
  | null

type ApiResponseDvla = Partial<VehicleDetails> & {
  make: string
}

export const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ user, onAddVehicle, onClose }) => {
  const [registrationNumber, setRegistrationNumber] = useState("AE68FWG")
  const [vehicleData, setVehicleData] = useState<VehicleData>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicleData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
        {
          method: "POST",
          headers: {
            "x-api-key": "1x9gAFNoBFkL9lMpL07K14LSEFPkuvr20bzcjAd6",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registrationNumber }),
        },
      )
      const data = (await response.json()) as ApiResponseDvla
      if (response.ok) {
        setVehicleData({
          model: "",
          make: data.make,
          registrationNumber: data.registrationNumber,
          taxStatus: data.taxStatus,
          taxDueDate: data.taxDueDate && new Date(data.taxDueDate),
          motStatus: data.motStatus,
          motExpiryDate: data.motExpiryDate && new Date(data.motExpiryDate),
          yearOfManufacture: data.yearOfManufacture,
          engineCapacity: data.engineCapacity,
          co2Emissions: data.co2Emissions,
          fuelType: data.fuelType,
          markedForExport: data.markedForExport,
          colour: data.colour,
          typeApproval: data.typeApproval,
          euroStatus: data.euroStatus,
          dateOfLastV5CIssued: data.dateOfLastV5CIssued && new Date(data.dateOfLastV5CIssued),
          wheelplan: data.wheelplan,
          monthOfFirstRegistration:
            data.monthOfFirstRegistration && new Date(data.monthOfFirstRegistration),
        })
      } else {
        setError(data.message || "Failed to fetch vehicle data")
      }
    } catch (err) {
      setError(err.message || "Failed to fetch vehicle data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddVehicle = () => {
    if (vehicleData) {
      const { make, model, ...details } = vehicleData
      onAddVehicle(make, model, details)
      onClose()
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextField
          label="Registration Number"
          placeholder="Enter Registration Number"
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
        />
        <Button title="Search" onPress={fetchVehicleData} disabled={loading} />
        {error && <Text style={styles.error}>{error}</Text>}
        {vehicleData && (
          <View>
            <TextField autoFocus label="Model" value={vehicleData.model} />
            <TextField label="Make" value={vehicleData.make} />
            <TextField
              label="Year of Manufacture"
              value={vehicleData.yearOfManufacture?.toString() || ""}
            />
            <TextField
              label="Engine Capacity"
              value={vehicleData.engineCapacity?.toString() || ""}
            />
            <TextField label="Fuel Type" value={vehicleData.fuelType} />
            <TextField label="Colour" value={vehicleData.colour} />
            <TextField label="Tax Status" value={vehicleData.taxStatus} />
            <TextField label="Tax Due Date" value={vehicleData.taxDueDate?.toDateString() || ""} />
            <TextField label="MOT Status" value={vehicleData.motStatus} />
            <TextField
              label="MOT Expiry Date"
              value={vehicleData.motExpiryDate?.toDateString() || ""}
            />
            <TextField label="CO2 Emissions" value={vehicleData.co2Emissions?.toString() || ""} />
            <TextField
              label="Marked for Export"
              value={vehicleData.markedForExport ? "Yes" : "No"}
            />
            <TextField label="Type Approval" value={vehicleData.typeApproval} />
            <TextField label="Euro Status" value={vehicleData.euroStatus} />
            <TextField
              label="Date of Last V5C Issued"
              value={vehicleData.dateOfLastV5CIssued?.toDateString() || ""}
            />
            <TextField label="Wheelplan" value={vehicleData.wheelplan} />
            <TextField
              label="Month of First Registration"
              value={vehicleData.monthOfFirstRegistration?.toDateString() || ""}
            />
            <Button title="Add Vehicle" onPress={handleAddVehicle} />
          </View>
        )}
        <Button title="Close" onPress={onClose} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  error: {
    color: "red",
    marginBottom: 16,
  },
})
