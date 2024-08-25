import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const StoreTab = observer(({ renderNestedObject }) => {
  const { authenticationStore } = useStores()
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItemExpansion = (key) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const renderStoreItems = () => {
    return Object.keys(authenticationStore).map((key) => (
      <View key={key} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => toggleItemExpansion(key)}>
          <Text style={styles.itemTitle}>{key}</Text>
        </TouchableOpacity>
        {expandedItems[key] && (
          <View style={styles.collapsibleContent}>
            {renderNestedObject(authenticationStore[key])}
          </View>
        )}
      </View>
    ))
  }

  return (
    <ScrollView contentContainerStyle={styles.storeTabContainer}>{renderStoreItems()}</ScrollView>
  )
})

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  listContentContainer: {
    paddingBottom: 40,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  collapsibleContent: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
  },
  storeTabContainer: {
    padding: 16,
  },
})
