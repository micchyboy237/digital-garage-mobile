import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Screen } from "app/components"
import { MOCK_CARS } from "app/screens/user/UserCarsScreen/mock"
import { ListingsProps } from "app/screens/user/UserCarsScreen/types"
import { trpc } from "app/services/api"
import React, { useEffect, useRef, useState } from "react"
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"

export const UserCarsScreen = () => {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("all")
  const listRef = useRef<FlatList>(null)
  const navigation = useNavigation()

  const data = MOCK_CARS
  // const {
  //   data: dbData,
  //   error: dbError,
  //   isLoading: dbLoading,
  // } = trpc.user.findManyUser.useQuery({
  //   select: {
  //     id: true,
  //     session: true,
  //     subscription: true,
  //     vehicleOwnerships: true,
  //     documents: true,
  //   },
  // })
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = trpc.user.findUniqueUser.useQuery({
    where: {
      id: "user-1",
    },
    include: {
      session: true,
      subscription: true,
      vehicleOwnerships: true,
      documents: true,
    },
  })
  console.log("User query:", {
    userData,
    userError,
    userLoading,
  })

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  const renderRow: ListRenderItem<ListingsProps> = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("CarDetails", { id: item.id })}>
        <Animated.View style={styles.listings} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image
            source={{ uri: item.medium_url ? item.medium_url! : item.xl_picture_url! }}
            style={styles.image}
          />
          <TouchableOpacity style={{ position: "absolute", right: 30, top: 40 }}>
            <Ionicons name="heart-outline" size={24} color="primary" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" />
              <Text style={{ marginLeft: 5 }}>
                {item.review_scores_rating ? item.review_scores_rating / 20 : "New"}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 13 }}>{item.smart_location}</Text>
              <Text style={{ fontSize: 13 }}>{item.room_type}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                {"Monthly rent: " + item.weekly_price + "€"}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <FlatList renderItem={renderRow} data={loading ? [] : data} ref={listRef} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  listings: {
    paddingTop: 30,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
})
