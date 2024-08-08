import { ActivityIndicator, ListView, Text, TextField } from "app/components"
import { trpc } from "app/services/api"
import React, { useEffect, useState } from "react"
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
  },
  nestedObjectContainer: {
    marginLeft: 10,
  },
  nestedObjectTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  nestedObjectText: {
    fontSize: 14,
    color: "#333",
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
  tabViewContainer: {
    flex: 1,
  },
  dropdownContainer: {
    margin: 10,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: "#333",
  },
  dropdownOptionsContainer: {
    backgroundColor: "#e9ecef",
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownOption: {
    padding: 10,
  },
  activeDropdownOption: {
    backgroundColor: "#007bff",
  },
  dropdownOptionText: {
    fontSize: 14,
    color: "#333",
  },
  activeDropdownOptionText: {
    color: "#fff",
  },
  typeContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
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
  testButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
})

export function DemoFeaturesScreen() {
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFormFields, setCurrentFormFields] = useState({})
  const {
    data: routesData,
    error: routesError,
    isLoading: routesLoading,
    refetch: manualRefresh,
  } = trpc.meta.getRoutes.useQuery()
  // const {
  //   data: allUsers,
  //   error: allUsersError,
  //   isLoading: allUsersLoading,
  // } = trpc.user.findManyUser.useQuery({
  //   select: {
  //     id: true,
  //     role: true,
  //     firstName: true,
  //     lastName: true,
  //     email: true,
  //     auth: true,
  //   },
  // })

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

  const renderNestedObject = (obj, level = 0) => {
    return Object.keys(obj).map((key) => {
      const value = obj[key]
      if (typeof value === "object" && value !== null) {
        return (
          <View key={key} style={[styles.nestedObjectContainer, { marginLeft: level * 10 }]}>
            <Text style={styles.nestedObjectTitle}>{key}:</Text>
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

  const handleTestButtonClick = (item) => {
    console.log("handleTestButtonClick", item)
    setCurrentFormFields({
      ...item,
      endpoint: `http://localhost:3000/trpc/${item.key}`,
    })
    setModalVisible(true)
  }

  const handleFormSubmit = async () => {
    console.log("Submitting form", currentFormFields)
  }

  const groupDataByFirstLevelKey = (data) => {
    const groupedData = {}
    data.forEach((item) => {
      const groupKey = item.key.split(".")[0]
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = []
      }
      groupedData[groupKey].push(item)
    })
    return groupedData
  }

  const groupedData = routesData ? groupDataByFirstLevelKey(routesData) : {}

  const filteredData =
    selectedType === "all"
      ? selectedGroup === "all"
        ? routesData
        : groupedData[selectedGroup]
      : (selectedGroup === "all" ? routesData : groupedData[selectedGroup])?.filter(
          (item) => item.type === selectedType,
        )

  const expandedItemsCount = Object.values(expandedItems).filter((item) => item).length

  const renderDropdown = (
    options,
    selectedOption,
    onSelectOption,
    dropdownOpen,
    setDropdownOpen,
    title,
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownButtonText}>{title}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={styles.dropdownButtonText}>{selectedOption}</Text>
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={styles.dropdownOptionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownOption,
                selectedOption === option && styles.activeDropdownOption,
              ]}
              onPress={() => {
                onSelectOption(option)
                setDropdownOpen(false)
              }}
            >
              <Text
                style={[
                  styles.dropdownOptionText,
                  selectedOption === option && styles.activeDropdownOptionText,
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )

  const renderTypeTabs = () => (
    <View style={styles.tabsContainer}>
      {["all", "query", "mutation"].map((type) => (
        <TouchableOpacity
          key={type}
          style={[styles.tabButton, selectedType === type && styles.activeTabButton]}
          onPress={() => setSelectedType(type)}
        >
          <Text style={[styles.tabButtonText, selectedType === type && styles.activeTabButtonText]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

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
      {routesLoading && <Text>Loading routes...</Text>}
      {routesError && <Text>Error: {routesError.message}</Text>}
      {!!routesData && (
        <View style={styles.tabViewContainer}>
          {renderDropdown(
            ["all", ...Object.keys(groupedData)],
            selectedGroup,
            setSelectedGroup,
            groupDropdownOpen,
            setGroupDropdownOpen,
            "Select Group",
          )}
          {renderTypeTabs()}
          <View style={{ height: "100%", padding: 16 }}>
            <Text style={styles.title}>Available Routes:</Text>
            <ListView
              contentContainerStyle={styles.listContentContainer}
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              extraData={routesData.length + expandedItemsCount}
              refreshing={routesLoading}
              estimatedItemSize={routesData.length}
              onRefresh={manualRefresh}
              ListEmptyComponent={
                routesLoading ? <ActivityIndicator /> : <Text>No routes available.</Text>
              }
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => toggleItemExpansion(item.key)}>
                    <Text style={styles.itemTitle}>{item.key}</Text>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.typeContainer,
                      { backgroundColor: item.type === "query" ? "green" : "red" },
                    ]}
                  >
                    <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                  </View>
                  {expandedItems[item.key] && renderNestedObject(item.inputs)}

                  <TouchableOpacity
                    style={styles.testButton}
                    onPress={() => handleTestButtonClick(item)}
                  >
                    <Text style={{ color: "#fff" }}>Test</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      )}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  height: "100%",
                }}
              >
                <View
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Test Route
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {currentFormFields.key}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: "grey",
                    }}
                  >
                    {currentFormFields.endpoint}
                  </Text>
                </View>
                <ScrollView>{!!currentFormFields?.inputs && renderFormFields()}</ScrollView>
                <Button title="Submit" onPress={handleFormSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  )
}
