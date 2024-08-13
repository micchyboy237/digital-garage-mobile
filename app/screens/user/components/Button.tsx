import { colors } from "app/theme"
import React from "react"
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from "react-native"

export const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.palette.primary400,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
})
