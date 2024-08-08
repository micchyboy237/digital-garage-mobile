import { VehicleOwnership } from "app/types"
import React from "react"
import { Button, Image, ScrollView, Text } from "react-native"

interface TransferRouteProps {
  vehicleOwnership: VehicleOwnership
}

const ShareRoute: React.FC<TransferRouteProps> = ({ vehicleOwnership }) => {
  return (
    <ScrollView>
      <Image source={{ uri: "path/to/qrCode.png" }} style={{ width: 100, height: 100 }} />
      <Text>Print QR Code</Text>
      <Button title="Print" onPress={() => {}} />
      <Text>Generate Link</Text>
      <Button title="Generate" onPress={() => {}} />
      <Text>
        Web Link: <Text style={{ color: "blue" }}>http://example.com</Text>
      </Text>
      <Button title="Delete Link" onPress={() => {}} />
    </ScrollView>
  )
}

export default ShareRoute
