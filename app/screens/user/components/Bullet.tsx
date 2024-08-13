import React from "react"
import { StyleSheet, View } from "react-native"

interface BulletProps {
  active?: boolean
}

export function Bullet({ active = false }: BulletProps) {
  return <View style={[styles.container, active && styles.active]} />
}

const styles = StyleSheet.create({
  container: {
    width: 6,
    height: 6,
    backgroundColor: "gray", // Default color, replace with theme.colors.shape if available
    marginLeft: 8,
    borderRadius: 3,
  },
  active: {
    backgroundColor: "black", // Active color, replace with theme.colors.title if available
  },
})
