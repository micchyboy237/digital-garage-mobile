import { Ionicons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { mockUser } from "app/screens/digital-garage/data/mock"
import { colors, typography } from "app/theme"
import { VehicleOwnership } from "app/types"
import React, { useLayoutEffect, useRef } from "react"
import { Dimensions, Image, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated"

const IMG_HEIGHT = 300
const { width } = Dimensions.get("window")

interface Params {
  id: string
}

export const CarDetailsScreen = () => {
  const route = useRoute()
  const { id } = route.params as Params
  const listing: VehicleOwnership | undefined = mockUser.vehicleOwnerships.find(
    (item) => item.id === id,
  )
  const navigation = useNavigation()
  const scrollRef = useRef<Animated.ScrollView>(null) // Use React.createRef instead

  const shareListing = async () => {
    if (!listing) return
    try {
      await Share.share({
        title: `${listing.vehicle?.make} ${listing.vehicle?.model}`,
        url: listing.displayPicture?.url,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    })
  }, [])

  const scrollOffset = useScrollViewOffset(scrollRef)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  }, [])

  if (!listing) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Car not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef} // Use the ref here
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: listing.displayPicture?.url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{`${listing.vehicle?.make} ${listing.vehicle?.model}`}</Text>
          <Text style={styles.location}>{listing.vehicle?.details?.colour}</Text>
          <Text style={styles.rooms}>
            {listing.vehicle?.details?.yearOfManufacture} ·{" "}
            {listing.vehicle?.details?.engineCapacity} cc · {listing.vehicle?.details?.fuelType}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>Rated 5.0</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.user?.profilePicture?.url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Owned by {listing.user?.firstName} {listing.user?.lastName}
              </Text>
              <Text>Since {listing.startDate?.getFullYear()}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>£{listing.vehicle?.details?.engineCapacity}</Text>
            <Text>year</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={styles.btnText}>Transfer Ownership</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: colors.palette.neutral100,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: typography.primary.semiBold,
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: typography.primary.semiBold,
  },
  rooms: {
    fontSize: 16,
    color: colors.textDim,
    marginVertical: 4,
    fontFamily: typography.primary.normal,
  },
  ratings: {
    fontSize: 16,
    fontFamily: typography.primary.semiBold,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.textDim,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: typography.primary.semiBold,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.palette.neutral100,
    alignItems: "center",
    justifyContent: "center",
    color: colors.tint,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: colors.palette.neutral100,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: typography.primary.normal,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.palette.neutral100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  btn: {
    backgroundColor: colors.tint,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: colors.palette.neutral100,
    fontSize: 16,
    fontFamily: typography.primary.bold,
  },
})
