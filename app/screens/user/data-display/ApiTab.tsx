import { ListView } from "app/components"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export function ApiTab({
  routesData,
  expandedItems,
  toggleItemExpansion,
  renderNestedObject,
  routesPending,
  manualRefresh,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Routes:</Text>
      <ListView
        contentContainerStyle={styles.listContentContainer}
        data={routesData}
        keyExtractor={(item, index) => index.toString()}
        extraData={routesData.length + Object.values(expandedItems).filter(Boolean).length}
        refreshing={routesPending}
        estimatedItemSize={routesData.length}
        onRefresh={manualRefresh}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleItemExpansion(item.key)}>
              <Text style={styles.itemTitle}>{item.key}</Text>
            </TouchableOpacity>
            {expandedItems[item.key] && renderNestedObject(item.inputs)}
          </View>
        )}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  listContentContainer: {
    paddingBottom: 40,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  nestedObjectContainer: {
    marginLeft: 10,
  },
  nestedObjectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  nestedObjectText: {
    fontSize: 14,
    color: "green",
  },
})
