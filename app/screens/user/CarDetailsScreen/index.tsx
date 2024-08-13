import React, { useEffect, useState } from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import { Accessory } from "../components/Accessory"
import { BackButton } from "../components/BackButton"
import { ImageSlider } from "../components/ImageSlider"

import { useNavigation, useRoute } from "@react-navigation/native"
import { Button } from "../components/Button"
import { CarModel } from "../MyCarsScreen/CarModel"
import { CarDTO } from "../MyCarsScreen/types"

import { useNetInfo } from "@react-native-community/netinfo"
import { Screen } from "app/components"
import { MOCK_CARS_DATA } from "app/screens/digital-garage/data/mock-cars"
import { Car } from "app/screens/digital-garage/data/types"
import { getAccessoryIcon } from "app/screens/user/MyCarsScreen/getAccessories"
import { colors, typography } from "app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface Params {
  car: CarModel
}

export function CarDetailsScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params
  const netInfo = useNetInfo()
  const insets = useSafeAreaInsets()

  //STATES
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  console.log("carUpdated:", JSON.stringify(carUpdated, null, 2))

  //Animations
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    }
  })

  //Navigation Functions

  function handleScheduling() {
    navigation.navigate("Scheduling", { car })
  }

  function handleGoBack() {
    navigation.navigate("Home")
  }

  //UseEffects
  useEffect(() => {
    async function fetchCarUpdated() {
      //   const response = await api.get(`/cars/${car.id}`)
      const result = MOCK_CARS_DATA.cars.find((item) => item.id === car.id) as Car
      const response = {
        data: result,
      }
      setCarUpdated(response.data)
    }
    if (netInfo.isConnected === true) {
      fetchCarUpdated()
    }
  }, [netInfo.isConnected])

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]} style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Animated.View
        style={[headerStyleAnimation, styles.header, { backgroundColor: colors.background }]}
      >
        <View style={styles.headerContent}>
          <BackButton onPress={handleGoBack} />
        </View>
        <Animated.View style={sliderCarsStyleAnimation}>
          <View style={styles.carImages}>
            <ImageSlider
              imageUrl={
                carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 180,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.details}>
          <View style={styles.description}>
            <Text style={styles.brand}>{car.brand}</Text>
            <Text style={styles.name}>{car.name}</Text>
          </View>

          <View style={styles.rent}>
            <Text style={styles.period}>{car.rent.period}</Text>
            <Text style={styles.price}>{`£ ${
              netInfo.isConnected === true ? car.rent.price : "..."
            }`}</Text>
          </View>
        </View>

        {carUpdated.accessories && (
          <View style={styles.accessories}>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </View>
        )}

        <Text style={styles.about}>{car.about}</Text>
      </Animated.ScrollView>
      <View style={styles.footer}>
        <Button
          title="Transfer ownership"
          onPress={handleScheduling}
          enabled={netInfo.isConnected === true}
        />
        {netInfo.isConnected === false && (
          <Text style={styles.offlineInfo}>
            Connect to the internet to view more details and schedule your rental.
          </Text>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginLeft: 24,
  },
  carImages: {
    marginTop: 32,
  },
  details: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {},
  brand: {
    fontFamily: typography.primary.bold,
    color: colors.textDim,
    fontSize: 10,
    textTransform: "uppercase",
  },
  name: {
    fontFamily: typography.primary.bold,
    color: colors.text,
    fontSize: 25,
  },
  rent: {},
  period: {
    fontFamily: typography.primary.bold,
    color: colors.textDim,
    fontSize: 10,
    textTransform: "uppercase",
  },
  price: {
    fontFamily: typography.primary.bold,
    color: colors.tint,
    fontSize: 25,
  },
  accessories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  about: {
    fontFamily: typography.primary.normal,
    color: colors.text,
    fontSize: 15,
    textAlign: "justify",
    marginTop: 23,
    lineHeight: 25,
  },
  footer: {
    width: "100%",
    backgroundColor: colors.background,
    padding: 24,
    paddingBottom: 24,
  },
  offlineInfo: {
    fontFamily: typography.primary.normal,
    color: colors.tint,
    fontSize: 10,
    textAlign: "center",
  },
})
