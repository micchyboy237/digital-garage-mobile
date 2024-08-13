import React from "react"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

export const Input = (props: TextInputProps) => {
  return <TextInput style={styles.input} {...props} />
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
})
