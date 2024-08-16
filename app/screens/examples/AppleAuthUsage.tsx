import * as AppleAuthentication from "expo-apple-authentication"
import { CodedError } from "expo-modules-core"
import React from "react"
import { StyleSheet, View } from "react-native"

export default function AppleAuthUsage() {
  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            })
            // signed in
            console.log("SUCCESSFUL APPLE SIGN IN:\n", JSON.stringify(credential, null, 2))
          } catch (error) {
            const e = error as CodedError
            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
              console.error("USER CANCELED APPLE SIGN IN:", e)
            } else {
              // handle other errors
              console.error("ERROR APPLE SIGN IN:", e)
            }
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
})
