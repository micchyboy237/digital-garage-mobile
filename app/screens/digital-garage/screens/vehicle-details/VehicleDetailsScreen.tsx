import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useRoute } from "@react-navigation/native"
import { Screen } from "app/components"
import React from "react"
import { Image, View, ViewStyle } from "react-native"
import GalleryRoute from "./GalleryRoute"
import HistoryRoute from "./HistoryRoute"
import OverviewRoute from "./OverviewRoute"
import ShareRoute from "./ShareRoute"
import TransferRoute from "./TransferRoute"

interface VehicleDetailsScreenProps {}

const Tab = createMaterialTopTabNavigator()

export const VehicleDetailsScreen: React.FC<VehicleDetailsScreenProps> = () => {
  const route = useRoute()
  const { vehicleOwnership } = route.params

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <View
        style={{
          width: "100%",
          height: 170,
        }}
      >
        <Image
          style={{
            backgroundColor: "#cccccc",
            width: "100%",
            height: "100%",
          }}
          source={{ uri: vehicleOwnership.displayPicture?.url }}
        />
      </View>

      <Tab.Navigator
        // set default props for all tabs
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            backgroundColor: "#eeeeee",
          },
          tabBarLabelStyle: {
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen name="Overview">
          {() => <OverviewRoute vehicleOwnership={vehicleOwnership} />}
        </Tab.Screen>
        <Tab.Screen name="Gallery">
          {() => <GalleryRoute vehicleOwnership={vehicleOwnership} />}
        </Tab.Screen>
        <Tab.Screen name="History">
          {() => <HistoryRoute vehicleOwnership={vehicleOwnership} />}
        </Tab.Screen>
        <Tab.Screen name="Share">
          {() => <ShareRoute vehicleOwnership={vehicleOwnership} />}
        </Tab.Screen>
        <Tab.Screen name="Transfer">
          {() => <TransferRoute vehicleOwnership={vehicleOwnership} />}
        </Tab.Screen>
      </Tab.Navigator>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}
