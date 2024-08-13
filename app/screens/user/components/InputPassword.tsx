import React from "react"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

export const InputPassword = (props: TextInputProps) => {
  return <TextInput style={styles.inputPassword} {...props} />
}

const styles = StyleSheet.create({
  inputPassword: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
})
