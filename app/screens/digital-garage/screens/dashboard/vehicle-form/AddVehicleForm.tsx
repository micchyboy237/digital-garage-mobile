import { MaterialIcons } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Field } from "app/components"
import {
  fetchVehicleData,
  uploadVehicleDetails,
} from "app/screens/digital-garage/screens/dashboard/vehicle-form/api"
import { colors, spacing } from "app/theme"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { z } from "zod"

// Zod schema for validation
const vehicleSchema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
  // displayPhoto is ImagePickerAsset type
  displayPhoto: z
    .object({
      uri: z.string(),
      fileName: z.string(),
      mimeType: z.string(),
    })
    .nullable(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  yearOfManufacture: z
    .number()
    .min(1886, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  engineCapacity: z.number().min(1, "Engine capacity is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  colour: z.string().min(1, "Colour is required"),
  taxStatus: z.string().nullish(),
  taxDueDate: z.date().nullish(),
  motStatus: z.string().nullish(),
  motExpiryDate: z.date().nullish(),
})

type VehicleData = z.infer<typeof vehicleSchema>

export const AddVehicleForm: React.FC = () => {
  const [loading, setLoading] = useState(false)

  // Initialize form methods with zod resolver
  const methods = useForm<VehicleData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      displayPhoto: null,
      registrationNumber: "OGV 73P",
      make: "",
      model: "",
      yearOfManufacture: 0,
      engineCapacity: 0,
      fuelType: "",
      colour: "",
      taxStatus: "",
      taxDueDate: null,
      motStatus: "",
      motExpiryDate: null,
    },
  })

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods

  const onSearch = async (registrationNumber: string) => {
    setLoading(true)
    try {
      const data = await fetchVehicleData({ registrationNumber })
      console.log("Fetched Vehicle Data:", data)

      // Transform the fetched data to match the Zod schema
      const transformedData: Partial<VehicleData> = {
        registrationNumber: data.registrationNumber,
        make: data.make,
        model: data.model,
        yearOfManufacture: data.yearOfManufacture,
        engineCapacity: data.engineCapacity,
        fuelType: data.fuelType,
        colour: data.colour,
        taxStatus: data.taxStatus ?? null, // Handle nullable fields
        taxDueDate: data.taxDueDate ? new Date(data.taxDueDate) : null, // Convert string to Date object
        motStatus: data.motStatus ?? null,
        motExpiryDate: data.motExpiryDate ? new Date(data.motExpiryDate) : null,
      }

      console.log("Transformed Vehicle Data:", transformedData)

      // Dynamically set the values in the form
      Object.entries(transformedData).forEach(([key, value]) => {
        if (key in getValues()) {
          setValue(key as keyof VehicleData, value as any)
        }
      })
    } catch (error) {
      console.error("Error fetching vehicle data:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (formValues: VehicleData) => {
    console.log("Form submitted with data:", formValues)

    // Prepare data to be sent to the backend
    const formData = new FormData()
    if (formValues.displayPhoto) {
      // Extract file name and type from the display photo
      // const name = formValues.displayPhoto.split("/").pop()
      // const fileExt = name?.split(".").pop()
      // const type = `image/${fileExt}`
      console.log("Display photo:", {
        uri: formValues.displayPhoto.uri,
        type: formValues.displayPhoto.mimeType,
        name: formValues.displayPhoto.fileName,
      })
      formData.append("displayPhoto", {
        uri: formValues.displayPhoto.uri,
        type: formValues.displayPhoto.mimeType,
        name: formValues.displayPhoto.fileName,
      })
      formData.append("registrationNumber", formValues.registrationNumber)
      formData.append("make", formValues.make)
      formData.append("model", formValues.model)
      formData.append("yearOfManufacture", formValues.yearOfManufacture.toString())
      formData.append("engineCapacity", formValues.engineCapacity.toString())
      formData.append("fuelType", formValues.fuelType)
      formData.append("colour", formValues.colour)
      if (formValues.taxStatus) {
        formData.append("taxStatus", formValues.taxStatus)
      }
      if (formValues.taxDueDate) {
        formData.append("taxDueDate", formValues.taxDueDate.toISOString())
      }
      if (formValues.motStatus) {
        formData.append("motStatus", formValues.motStatus)
      }
      if (formValues.motExpiryDate) {
        formData.append("motExpiryDate", formValues.motExpiryDate.toISOString())
      }

      // Call the API to upload the vehicle details
      await uploadVehicleDetails(formData)
    }
  }

  console.log("Errors:", errors)
  console.log("Values:", getValues())

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Registration Number Input with Search */}

          {loading && <ActivityIndicator animating color={colors.palette.primary400} />}

          <View style={styles.formContainer}>
            <Field label="Make" name="make" style={styles.input} />
            <Field label="Model" name="model" style={styles.input} />
            <Field
              label="Registration Number"
              name="registrationNumber"
              style={styles.input}
              RightAccessory={() => (
                <MaterialIcons
                  name="search"
                  size={24}
                  color="black"
                  onPress={() => onSearch(getValues("registrationNumber"))}
                />
              )}
            />

            <Field
              label="Display Photo"
              name="displayPhoto"
              type="image"
              size={180}
              fullWidth
              icon="car"
            />
            <Field
              label="Year of Manufacture"
              name="yearOfManufacture"
              style={styles.input}
              keyboardType="numeric"
            />

            <Field
              label="Engine Capacity (cc)"
              name="engineCapacity"
              style={styles.input}
              keyboardType="numeric"
            />

            <Field label="Fuel Type" name="fuelType" style={styles.input} />

            <Field label="Color" name="colour" style={styles.input} />

            {/* More Fields as needed */}
            <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
              Submit
            </Button>
          </View>
        </ScrollView>
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    overflow: "hidden",
  },
  contentContainer: {
    padding: spacing.md,
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
})
