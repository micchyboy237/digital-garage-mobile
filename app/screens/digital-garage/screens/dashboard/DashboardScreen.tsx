import { useNavigation } from "@react-navigation/native"
import { Screen } from "app/components"
import { mock2ndUser, mockUser } from "app/screens/digital-garage/data/mock"
import { spacing } from "app/theme"
import { VehicleOwnership } from "app/types"
import React, { useState } from "react"
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"

interface DashboardScreenProps {}

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const [user, setUser] = useState(mockUser)
  const navigation = useNavigation()

  const currentVehicles = user.vehicleOwnerships.filter(
    (ownership) => ownership.isCurrentOwner || ownership.isTemporaryOwner,
  )

  const previousVehicles = user.vehicleOwnerships.filter(
    (ownership) => !ownership.isCurrentOwner && !ownership.isTemporaryOwner,
  )

  const handleVehiclePress = (vehicleOwnership: VehicleOwnership) => {
    navigation.navigate("VehicleDetails", { vehicleOwnership })
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Digital Garage</Text>
        <View style={styles.topBarRight}>
          <Text style={styles.topBarRightText}>Add Vehicle</Text>
          <Text style={styles.topBarRightText}>Notifications</Text>
          <Text style={styles.topBarRightText}>Settings</Text>
        </View>
      </View>
      <View style={styles.userSelection}>
        <Button title="User 1" onPress={() => setUser(mockUser)} />
        <Button title="User 2" onPress={() => setUser(mock2ndUser)} />
      </View>
      <View style={styles.userInfo}>
        {user.profilePicture ? (
          <Image source={{ uri: user.profilePicture }} style={styles.userPicture} />
        ) : (
          <View style={styles.userPicturePlaceholder} />
        )}
        <Text style={styles.fullName}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.location}>{user.location}</Text>
        <Text style={styles.ownedVehicleCount}>
          Owned Vehicle Count: {user.vehicleOwnerships.length}
        </Text>
      </View>
      <View style={styles.vehicleSection}>
        <Text style={styles.sectionTitle}>Current Vehicles</Text>
        {currentVehicles.map((vehicleOwnership) => (
          <TouchableOpacity
            key={vehicleOwnership.id}
            onPress={() => handleVehiclePress(vehicleOwnership)}
            style={styles.vehicleItemContainer}
          >
            {vehicleOwnership.displayPicture && (
              <View>
                <Image
                  source={{ uri: vehicleOwnership.displayPicture.url }}
                  style={styles.vehiclePicture}
                />
              </View>
            )}
            <Text style={styles.vehicleItem}>
              {vehicleOwnership.vehicle.make} {vehicleOwnership.vehicle.model} (
              {vehicleOwnership.vehicle.registrationNumber})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.vehicleSection}>
        <Text style={styles.sectionTitle}>Previous Vehicles</Text>
        {previousVehicles.map((vehicleOwnership) => (
          <TouchableOpacity
            key={vehicleOwnership.id}
            onPress={() => handleVehiclePress(vehicleOwnership)}
            style={styles.vehicleItemContainer}
          >
            {vehicleOwnership.displayPicture && (
              <View>
                <Image
                  source={{ uri: vehicleOwnership.displayPicture.url }}
                  style={styles.vehiclePicture}
                />
              </View>
            )}
            <Text style={styles.vehicleItem}>
              {vehicleOwnership.vehicle.make} {vehicleOwnership.vehicle.model} (
              {vehicleOwnership.vehicle.registrationNumber})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  topBarRight: {
    flexDirection: "row",
  },
  topBarRightText: {
    marginLeft: 16,
    fontSize: 16,
  },
  userSelection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  userInfo: {
    marginBottom: 16,
    alignItems: "center",
  },
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  userPicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: "#cccccc",
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
  },
  ownedVehicleCount: {
    fontSize: 16,
  },
  vehicleSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  vehicleItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  vehiclePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    backgroundColor: "#cccccc",
  },
  vehicleItem: {
    fontSize: 16,
  },
})
