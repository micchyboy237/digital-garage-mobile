import { colors, typography } from "app/theme"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { SvgProps } from "react-native-svg"

interface Props {
  name: string
  icon: React.FC<SvgProps>
}

export function Accessory({ name, icon: Icon }: Props) {
  return (
    <View style={styles.container}>
      <Icon width={32} height={32} />
      <Text style={[styles.name, { fontFamily: typography.primary.medium, color: colors.text }]}>
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 109,
    height: 92,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAEBEF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  name: {
    marginTop: 8,
    fontSize: 13,
  },
})
