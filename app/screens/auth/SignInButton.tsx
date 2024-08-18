import { Ionicons } from "@expo/vector-icons"
import { Icon } from "app/components"
import React from "react"
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"

interface SignInButtonProps {
  type: "apple" | "google"
  onPress: () => void
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const SignInButton: React.FC<SignInButtonProps> = ({ type, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        type === "apple" ? styles.appleButton : styles.googleButton,
        style,
      ]}
    >
      {type === "apple" ? (
        <Ionicons name="logo-apple" size={24} color="#fff" />
      ) : (
        <Icon icon="google" size={24} />
      )}
      <Text
        numberOfLines={1}
        style={[
          styles.buttonText,
          type === "apple" ? styles.appleText : styles.googleText,
          textStyle,
        ]}
      >
        {type === "apple" ? "Sign in with Apple" : "Sign in with Google"}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: "#000",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  appleText: {
    color: "#fff",
  },
  googleText: {
    color: "#000",
  },
})
