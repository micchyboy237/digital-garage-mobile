import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface CheckboxProps {
  value: boolean
  onValueChange: (newValue: boolean) => void
  label: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, onValueChange, label }) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.container}>
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && <View style={styles.innerCheckbox} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#000",
  },
  innerCheckbox: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
  },
  label: {
    marginLeft: 8,
  },
})
