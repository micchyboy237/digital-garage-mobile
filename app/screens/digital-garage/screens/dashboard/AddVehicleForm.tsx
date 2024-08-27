import { Button, Text, TextField } from "app/components"
import { ImagePicker } from "app/components/ImagePicker"
import { User } from "app/models/user/User"
import { colors, spacing, typography } from "app/theme"
import { MediaFile, MediaFileType, VehicleDetails } from "app/types"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

export interface AddVehicleFormProps {
  user: User
  onAddVehicle: (
    make: string,
    model: string,
    details: Partial<VehicleDetails>,
    displayPicture?: MediaFile,
  ) => void
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
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [vehicleData, setVehicleData] = useState<VehicleData>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayPicture, setDisplayPicture] = useState<MediaFile | null>(null)

  // Individual states for each text field
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [yearOfManufacture, setYearOfManufacture] = useState("")
  const [engineCapacity, setEngineCapacity] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [colour, setColour] = useState("")
  const [taxStatus, setTaxStatus] = useState("")
  const [taxDueDate, setTaxDueDate] = useState("")
  const [motStatus, setMotStatus] = useState("")
  const [motExpiryDate, setMotExpiryDate] = useState("")
  const [co2Emissions, setCo2Emissions] = useState("")
  const [markedForExport, setMarkedForExport] = useState("")
  const [typeApproval, setTypeApproval] = useState("")
  const [euroStatus, setEuroStatus] = useState("")
  const [dateOfLastV5CIssued, setDateOfLastV5CIssued] = useState("")
  const [wheelplan, setWheelplan] = useState("")
  const [monthOfFirstRegistration, setMonthOfFirstRegistration] = useState("")

  useEffect(() => {
    if (vehicleData) {
      setMake(vehicleData.make || "")
      setModel(vehicleData.model || "")
      setYearOfManufacture(vehicleData.yearOfManufacture?.toString() || "")
      setEngineCapacity(vehicleData.engineCapacity?.toString() || "")
      setFuelType(vehicleData.fuelType || "")
      setColour(vehicleData.colour || "")
      setTaxStatus(vehicleData.taxStatus || "")
      setTaxDueDate(vehicleData.taxDueDate?.toDateString() || "")
      setMotStatus(vehicleData.motStatus || "")
      setMotExpiryDate(vehicleData.motExpiryDate?.toDateString() || "")
      setCo2Emissions(vehicleData.co2Emissions?.toString() || "")
      setMarkedForExport(vehicleData.markedForExport ? "Yes" : "No")
      setTypeApproval(vehicleData.typeApproval || "")
      setEuroStatus(vehicleData.euroStatus || "")
      setDateOfLastV5CIssued(vehicleData.dateOfLastV5CIssued?.toDateString() || "")
      setWheelplan(vehicleData.wheelplan || "")
      setMonthOfFirstRegistration(vehicleData.monthOfFirstRegistration?.toDateString() || "")
    }
  }, [vehicleData])

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
    onAddVehicle(
      make,
      model,
      {
        yearOfManufacture: parseInt(yearOfManufacture, 10),
        engineCapacity: parseInt(engineCapacity, 10),
        fuelType,
        colour,
        taxStatus,
        taxDueDate: taxDueDate ? new Date(taxDueDate) : undefined,
        motStatus,
        motExpiryDate: motExpiryDate ? new Date(motExpiryDate) : undefined,
        co2Emissions: parseInt(co2Emissions, 10),
        markedForExport: markedForExport === "Yes",
        typeApproval,
        euroStatus,
        dateOfLastV5CIssued: dateOfLastV5CIssued ? new Date(dateOfLastV5CIssued) : undefined,
        wheelplan,
        monthOfFirstRegistration: monthOfFirstRegistration
          ? new Date(monthOfFirstRegistration)
          : undefined,
      },
      displayPicture,
    )
    onClose()
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ gap: spacing.sm }}>
          <TextField
            label="Registration Number"
            placeholder="Enter Registration Number"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
          />
          <Button preset="reversed" onPress={fetchVehicleData} disabled={loading}>
            Search
          </Button>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        {vehicleData && (
          <View
            style={{
              gap: spacing.lg,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              marginTop: spacing.lg,
              paddingTop: spacing.lg,
            }}
          >
            <TextField autoFocus label="Model" value={model} onChangeText={setModel} />
            <TextField label="Make" value={make} onChangeText={setMake} />
            <View>
              <Text
                style={{
                  fontFamily: typography.primary.medium,
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                Display Picture
              </Text>
              <ImagePicker
                value={displayPicture?.thumbnailUrl}
                onImageSelected={(image) =>
                  setDisplayPicture({
                    type: MediaFileType.photo,
                    url: image,
                    thumbnailUrl: image,
                    mimeType: "image/jpeg",
                  })
                }
                size={180}
                fullWidth
                icon="car"
              />
            </View>

            {/* Divider view */}
            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border }} />

            <TextField
              label="Year of Manufacture"
              value={yearOfManufacture}
              onChangeText={setYearOfManufacture}
            />
            <TextField
              label="Engine Capacity"
              value={engineCapacity}
              onChangeText={setEngineCapacity}
            />
            <TextField label="Fuel Type" value={fuelType} onChangeText={setFuelType} />
            <TextField label="Colour" value={colour} onChangeText={setColour} />
            <TextField label="Tax Status" value={taxStatus} onChangeText={setTaxStatus} />
            <TextField label="Tax Due Date" value={taxDueDate} onChangeText={setTaxDueDate} />
            <TextField label="MOT Status" value={motStatus} onChangeText={setMotStatus} />
            <TextField
              label="MOT Expiry Date"
              value={motExpiryDate}
              onChangeText={setMotExpiryDate}
            />
            <TextField label="CO2 Emissions" value={co2Emissions} onChangeText={setCo2Emissions} />
            <TextField
              label="Marked for Export"
              value={markedForExport}
              onChangeText={setMarkedForExport}
            />
            <TextField label="Type Approval" value={typeApproval} onChangeText={setTypeApproval} />
            <TextField label="Euro Status" value={euroStatus} onChangeText={setEuroStatus} />
            <TextField
              label="Date of Last V5C Issued"
              value={dateOfLastV5CIssued}
              onChangeText={setDateOfLastV5CIssued}
            />
            <TextField label="Wheelplan" value={wheelplan} onChangeText={setWheelplan} />
            <TextField
              label="Month of First Registration"
              value={monthOfFirstRegistration}
              onChangeText={setMonthOfFirstRegistration}
            />
          </View>
        )}
      </ScrollView>

      {vehicleData && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: spacing.sm,
            gap: spacing.lg,
          }}
        >
          <Button
            style={{
              flex: 1,
            }}
            onPress={onClose}
          >
            Close
          </Button>
          <Button
            style={{
              flex: 1,
              backgroundColor: colors.palette.primary400,
            }}
            preset="reversed"
            onPress={handleAddVehicle}
          >
            Add Vehicle
          </Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
  },
  contentContainer: {},
  error: {
    color: "red",
    marginBottom: 16,
  },
})
