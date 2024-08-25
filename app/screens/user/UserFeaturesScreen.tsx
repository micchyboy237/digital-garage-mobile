import { TextField } from "app/components"
import { trpc } from "app/services/api"
import React, { useEffect, useState } from "react"
import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { ApiTab } from "./data-display/ApiTab"
import { DBTab } from "./data-display/DBTab"
import { StoreTab } from "./data-display/StoreTab"

const TABS = ["db", "api", "store"]

export function UserFeaturesScreen() {
  const [selectedTab, setSelectedTab] = useState("db")
  const [expandedItems, setExpandedItems] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFormFields, setCurrentFormFields] = useState({})

  const {
    data: routesData,
    error: routesError,
    isPending: routesPending,
    refetch: manualRefresh,
  } = trpc.meta.getRoutes.useQuery({})

  useEffect(() => {
    if (routesData) {
      const initialExpandedState = routesData.reduce((acc, item) => {
        acc[item.key] = false
        return acc
      }, {})
      setExpandedItems(initialExpandedState)
    }
  }, [routesData])

  const toggleItemExpansion = (key) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={[styles.tabButtonText, selectedTab === tab && styles.activeTabButtonText]}>
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  const renderNestedObject = (obj, level = 0) => {
    return Object.keys(obj).map((key) => {
      const value = obj[key]
      if (typeof value === "object" && value !== null) {
        return (
          <View key={key} style={[styles.nestedObjectContainer, { marginLeft: level * 10 }]}>
            {!Array.isArray(obj) && <Text style={styles.nestedObjectTitle}>{key}:</Text>}
            {renderNestedObject(value, level + 1)}
          </View>
        )
      } else {
        return (
          <View key={key} style={[styles.nestedObjectContainer, { marginLeft: level * 10 }]}>
            <Text style={styles.nestedObjectText}>
              <Text style={styles.nestedObjectTitle}>{key}:</Text> {value}
            </Text>
          </View>
        )
      }
    })
  }

  const renderContent = () => {
    if (selectedTab === "db") {
      return <DBTab routesData={routesData} renderNestedObject={renderNestedObject} />
    } else if (selectedTab === "api") {
      return (
        <ApiTab
          routesData={routesData}
          expandedItems={expandedItems}
          toggleItemExpansion={toggleItemExpansion}
          renderNestedObject={renderNestedObject}
          routesPending={routesPending}
          manualRefresh={manualRefresh}
        />
      )
    } else if (selectedTab === "store") {
      return <StoreTab renderNestedObject={renderNestedObject} />
    }
  }

  const handleFormSubmit = async () => {
    console.log("Submitting form", currentFormFields)
  }

  const renderFormFields = () => {
    return Object.keys(currentFormFields.inputs).map((key) => (
      <TextField
        key={key}
        label={key}
        placeholder={`Enter ${key}`}
        style={{ marginBottom: 10 }}
        onChangeText={(text) => {
          const newInputs = { ...currentFormFields.inputs }
          newInputs[key] = text
          setCurrentFormFields({ ...currentFormFields, inputs: newInputs })
        }}
      />
    ))
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderTabs()}
      {renderContent()}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>{!!currentFormFields?.inputs && renderFormFields()}</ScrollView>
              <Button title="Submit" onPress={handleFormSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f8f9fa",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  tabButton: {
    minWidth: 50,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#e9ecef",
    margin: 5,
    borderRadius: 5,
  },
  activeTabButton: {
    backgroundColor: "#007bff",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#333",
  },
  activeTabButtonText: {
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    maxHeight: "80%",
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
})
