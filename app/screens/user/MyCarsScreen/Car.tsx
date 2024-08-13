import { useNetInfo } from "@react-native-community/netinfo"
import { CarDTO } from "app/screens/user/MyCarsScreen/types"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { RectButton, RectButtonProps } from "react-native-gesture-handler"
import { getAccessoryIcon } from "./getAccessories"
interface Props extends RectButtonProps {
  data: CarDTO
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuelType)
  const netInfo = useNetInfo()
  console.log("data.rent.price:", data.rent.price)
  console.log("netInfo.isConnected:", netInfo.isConnected)
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.details}>
        <Text style={styles.brand}>{data.brand}</Text>
        <Text style={styles.name}>{data.name}</Text>

        <View style={styles.about}>
          <View style={styles.rent}>
            <Text style={styles.period}>{data.rent.period}</Text>
            <Text style={styles.price}>{`£${data.rent.price}`}</Text>
          </View>

          <View style={styles.type}>
            <MotorIcon />
          </View>
        </View>
      </View>
      <Image style={styles.carImage} resizeMode="contain" source={{ uri: data.thumbnail }} />
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 126,
    backgroundColor: "#F3F4F5", // Replace with theme.colors.background_secondary
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    marginBottom: 16,
  },
  details: {
    // Add any specific styles if needed
  },
  brand: {
    fontFamily: "Inter_500Medium", // Replace with theme.fonts.secondary_500
    color: "#AEAEB3", // Replace with theme.colors.text_detail
    fontSize: 10,
    textTransform: "uppercase",
  },
  name: {
    fontFamily: "Inter_500Medium", // Replace with theme.fonts.secondary_500
    color: "#47474D", // Replace with theme.colors.title
    fontSize: 15,
    textTransform: "capitalize",
  },
  about: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  rent: {
    marginRight: 24,
  },
  period: {
    fontFamily: "Inter_500Medium", // Replace with theme.fonts.secondary_500
    color: "#AEAEB3", // Replace with theme.colors.text_detail
    fontSize: 10,
    textTransform: "uppercase",
  },
  price: {
    fontFamily: "Inter_500Medium", // Replace with theme.fonts.secondary_500
    color: "#DC1637", // Replace with theme.colors.main
    fontSize: 15,
  },
  type: {
    // Add any specific styles if needed
  },
  carImage: {
    width: 167,
    height: 85,
  },
})
