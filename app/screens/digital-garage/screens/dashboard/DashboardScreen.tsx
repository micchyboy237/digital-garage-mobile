import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Screen } from "app/components"
import { useStores } from "app/models"
import { mock2ndUser, mockUser } from "app/screens/digital-garage/data/mock"
import { spacing } from "app/theme"
import { VehicleOwnership } from "app/types"
import React, { useState } from "react"
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { AddVehicleModal } from "./AddVehicleModal"

interface DashboardScreenProps {}

export const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  const [user, setUser] = useState(mockUser)
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)
  const navigation = useNavigation()

  const {
    authenticationStore: { logout },
  } = useStores()

  const currentVehicles = user.vehicleOwnerships.filter(
    (ownership) => ownership.isCurrentOwner || ownership.isTemporaryOwner,
  )

  const previousVehicles = user.vehicleOwnerships.filter(
    (ownership) => !ownership.isCurrentOwner && !ownership.isTemporaryOwner,
  )

  const handleVehiclePress = (vehicleOwnership: VehicleOwnership) => {
    navigation.navigate("VehicleDetails", { vehicleOwnership })
  }

  const handleAddVehicle = (newVehicle: VehicleOwnership) => {
    setUser((prevUser) => ({
      ...prevUser,
      vehicleOwnerships: [...prevUser.vehicleOwnerships, newVehicle],
    }))
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Digital Garage</Text>
        <View style={styles.topBarRight}>
          <TouchableOpacity onPress={() => setIsAddingVehicle(true)}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userSelection}>
        <Button title="User 1" onPress={() => setUser(mockUser)} />
        <Button title="User 2" onPress={() => setUser(mock2ndUser)} />
      </View>
      <View style={styles.userInfo}>
        {user.profilePicture && (
          <View>
            <Image source={{ uri: user.profilePicture.url }} style={styles.userPicture} />
          </View>
        )}
        <View>
          <Text style={styles.fullName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.location}>{user.location}</Text>
          <Text style={styles.ownedVehicleCount}>
            Owned Vehicle Count: {user.vehicleOwnerships.length}
          </Text>
        </View>
      </View>
      <AddVehicleModal
        visible={isAddingVehicle}
        user={user}
        onAddVehicle={handleAddVehicle}
        onClose={() => setIsAddingVehicle(false)}
      />
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
  userSelection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  userInfo: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
