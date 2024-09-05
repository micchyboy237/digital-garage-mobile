import { Ionicons } from "@expo/vector-icons"
import { Button, Text, TextField } from "app/components"
import { ImagePicker } from "app/components/ImagePicker"
import { MediaFile, MediaFileModel } from "app/models/media-file/MediaFile"
import { MediaFileType } from "app/models/media-file/MediaFileType"
import { User } from "app/models/user/User"
import { VehicleDetails } from "app/models/vehicle-details/VehicleDetails"
import { generateUUID } from "app/screens/auth/utils"
import { uploadVehicleDetails } from "app/screens/digital-garage/screens/dashboard/vehicle-form/api"
import { trpc } from "app/services/api"
import { colors, spacing, typography } from "app/theme"
import { VehicleOwnership } from "app/types"
import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

export interface AddVehicleFormProps {
  user: User
  onAddVehicle: (vehicle: VehicleOwnership) => void
  onClose: () => void
}

type VehicleData =
  | (Partial<VehicleDetails> & {
      displayPhoto: MediaFile | null
      make: string
      model: string
    })
  | null

type ApiResponseDvla = Omit<VehicleDetails, "id" | "model" | "createdAt" | "updatedAt">

export const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ user, onAddVehicle, onClose }) => {
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    displayPhoto: null,
    make: "",
    model: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayPhoto, setDisplayPhoto] = useState<MediaFile | null>(null)

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
  const [artEndDate, setArtEndDate] = useState("")
  const [revenueWeight, setRevenueWeight] = useState("")
  const [realDrivingEmissions, setRealDrivingEmissions] = useState("")

  const uploadVehicleDetailsMutation = trpc.uploadRouter.uploadVehicleDetails.useMutation()

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
      setArtEndDate(vehicleData.artEndDate?.toDateString() || "")
      setRevenueWeight(vehicleData.revenueWeight?.toString() || "")
      setRealDrivingEmissions(vehicleData.realDrivingEmissions || "")
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
          displayPhoto,
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
          artEndDate: data.artEndDate && new Date(data.artEndDate),
          revenueWeight: data.revenueWeight,
          realDrivingEmissions: data.realDrivingEmissions,
        })
      } else {
        console.error("NOT OK RESPONSE:\n", data)
        setError("Failed to fetch vehicle data")
      }
    } catch (err) {
      console.error("ERROR FETCHING DATA:\n", err)
      setError(err.message || "Failed to fetch vehicle data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddVehicle = async () => {
    try {
      if (!displayPhoto) {
        setError("Please select an image for the vehicle.")
        return
      }

      setLoading(true)
      setError(null)

      // Prepare data to be sent to the backend
      const formData = new FormData()
      formData.append("displayPhoto.uri", displayPhoto.url)
      formData.append("displayPhoto.name", displayPhoto.fileName)
      formData.append("displayPhoto.type", displayPhoto.mimeType)

      formData.append("model", model)
      formData.append("make", make)
      formData.append("yearOfManufacture", yearOfManufacture)
      formData.append("engineCapacity", engineCapacity)
      formData.append("fuelType", fuelType)
      formData.append("colour", colour)
      formData.append("taxStatus", taxStatus)
      formData.append("taxDueDate", taxDueDate)
      formData.append("motStatus", motStatus)
      formData.append("motExpiryDate", motExpiryDate)
      formData.append("co2Emissions", co2Emissions)
      formData.append("markedForExport", markedForExport)
      formData.append("typeApproval", typeApproval)
      formData.append("euroStatus", euroStatus)
      formData.append("dateOfLastV5CIssued", dateOfLastV5CIssued)
      formData.append("wheelplan", wheelplan)
      formData.append("monthOfFirstRegistration", monthOfFirstRegistration)
      formData.append("artEndDate", artEndDate)
      formData.append("revenueWeight", revenueWeight)
      formData.append("realDrivingEmissions", realDrivingEmissions)

      // Trigger the mutation to upload vehicle details
      // await uploadVehicleDetailsMutation.mutateAsync(formData, {
      //   onSuccess: (response) => {
      //     onAddVehicle(response.vehicle)
      //     onClose()
      //   },
      //   onError: (mutationError) => {
      //     setError(mutationError.message)
      //   },
      // })
      await uploadVehicleDetails(formData)
    } catch (err) {
      setError(err.message || "Failed to add vehicle.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Vehicle</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
                value={displayPhoto?.url}
                onImageSelected={async (file) => {
                  setDisplayPhoto(
                    MediaFileModel.create({
                      id: await generateUUID(),
                      url: file.uri,
                      thumbnailUrl: file.uri,
                      type: file.type === "image" ? MediaFileType.IMAGE : MediaFileType.VIDEO,
                      fileName: file.fileName || "photo.jpg",
                      mimeType: file.type || "image/jpeg",
                    }),
                  )
                }}
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
            padding: spacing.sm,
            gap: spacing.lg,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: colors.background,
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
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    right: spacing.sm - 4,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: spacing.md,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
})
