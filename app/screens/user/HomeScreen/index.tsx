import { useNetInfo } from "@react-native-community/netinfo"
import { useNavigation } from "@react-navigation/native"
import { Loading } from "app/components/Loading"
import { MOCK_CARS_DATA } from "app/screens/digital-garage/data/mock-cars"
import Logo from "assets/svgs/logo.svg"
import React, { useEffect, useState } from "react"
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native"
import { Car } from "../MyCarsScreen/Car"
import { CarDTO } from "../MyCarsScreen/types"

export function HomeScreen() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car })
  }

  async function fetchCars() {
    try {
      setLoading(true)
      //   const response = await api.get("/cars");
      const response = {
        data: MOCK_CARS_DATA.cars,
      }
      setCars(response.data)
    } catch (error) {
      console.log("fetchCars error: " + error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  useEffect(() => {
    if (netInfo.isConnected === true) {
      // Handle online synchronization if needed
    }
  }, [netInfo.isConnected])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Logo width={108} height={12} />
          {!loading && <Text style={styles.totalCars}>Total: {cars.length} carros</Text>}
        </View>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          contentContainerStyle={styles.carList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F6", // Replace with your theme color
  },
  header: {
    width: "100%",
    height: 113,
    backgroundColor: "#1B1B1F", // Replace with your theme color
    justifyContent: "flex-end",
    paddingHorizontal: 14,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalCars: {
    fontSize: 15,
    fontFamily: "Inter_400Regular", // Replace with your theme font
    color: "#7A7A80", // Replace with your theme color
  },
  carList: {
    padding: 24,
  },
})
