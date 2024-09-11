import { MaterialIcons } from "@expo/vector-icons" // Import the vector icon
import { Text } from "app/components"
import { colors, spacing } from "app/theme"
import { VehicleOwnership } from "app/types"
import React from "react"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { RectButton, RectButtonProps } from "react-native-gesture-handler"

interface Props extends RectButtonProps {
  data: VehicleOwnership
}

// Calculate the height based on the aspect ratio
const aspectRatio = 390 / 180
const screenWidth = Dimensions.get("window").width
const imageHeight = screenWidth / aspectRatio

export function Car({ data, ...rest }: Props) {
  console.log("Car:", data)
  const imageUrl = data.vehicleDisplayPhoto?.url

  return (
    <RectButton style={[styles.container, { height: imageHeight }]} {...rest}>
      {imageUrl ? (
        <Image style={styles.carImage} resizeMode="cover" source={{ uri: imageUrl }} />
      ) : (
        <View style={styles.placeholderContainer}>
          <MaterialIcons name="directions-car" size={64} color={colors.palette.neutral300} />
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.make}>
          {data.vehicle?.make} {data.vehicle?.model}
        </Text>
        <Text style={styles.model}>{data.vehicleDetails?.colour}</Text>
        <Text style={styles.description}>{data.vehicle?.registrationNumber}</Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral300,
    borderWidth: 1,
    borderRadius: 16,
    shadowColor: colors.palette.neutral800,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 12.81,
    elevation: 16,
  },
  carImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.palette.neutral200,
  },
  details: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: spacing.xs,
    borderRadius: spacing.xs,
  },
  make: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  model: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  description: {
    marginTop: spacing.xs,
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
})
