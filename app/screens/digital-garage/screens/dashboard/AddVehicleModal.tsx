import { AddVehicleForm } from "app/screens/digital-garage/screens/dashboard/AddVehicleForm"
import { VehicleOwnership } from "app/types"
import React from "react"
import { Modal, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface AddVehicleModalProps {
  visible: boolean
  user: any
  onAddVehicle: (newVehicle: VehicleOwnership) => void
  onClose: () => void
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  visible,
  user,
  onAddVehicle,
  onClose,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {
              marginTop: insets.top,
              marginBottom: insets.bottom,
            },
          ]}
        >
          <AddVehicleForm user={user} onAddVehicle={onAddVehicle} onClose={onClose} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
})
