import { ListView, Text, TextField } from "app/components"
import { Loading } from "app/components/Loading"
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

const TABS = ["db", "api"]

export function UserFeaturesScreen() {
  const [selectedTab, setSelectedTab] = useState("db")
  const [expandedItems, setExpandedItems] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [currentFormFields, setCurrentFormFields] = useState({})

  const {
    data: routesData,
    error: routesError,
    isLoading: routesLoading,
    refetch: manualRefresh,
  } = trpc.meta.getRoutes.useQuery()

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

  const handleFormSubmit = async () => {
    console.log("Submitting form", currentFormFields)
  }

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

  const renderContent = (routesData) => {
    if (selectedTab === "api") {
      return (
        <View style={{ height: "100%", padding: 16 }}>
          <Text style={styles.title}>Available Routes:</Text>
          <ListView
            contentContainerStyle={styles.listContentContainer}
            data={routesData}
            keyExtractor={(item, index) => index.toString()}
            extraData={routesData?.length + Object.values(expandedItems).filter(Boolean).length}
            refreshing={routesLoading}
            estimatedItemSize={routesData?.length}
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
    } else if (selectedTab === "db") {
      const dbRoutes = routesData?.filter((route) => route.key.includes(".findMany")) || []
      return (
        <View style={{ height: "100%" }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {dbRoutes.map((route) => {
                const [dbType, dbMethod] = route.key.split(".")

                return (
                  <View key={route.key}>
                    <DBTab type={dbType} method={dbMethod} renderItem={renderNestedObject} />
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      )
    }
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
      {renderContent(routesData)}
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

export function DBTab({
  type,
  method,
  renderItem,
}: {
  type: string
  method: string
  renderItem: (obj: any) => any
}) {
  const {
    data: dbData,
    error: dbError,
    isLoading: dbLoading,
  } = trpc[type][method].useQuery({
    select: {
      id: true,
    },
  })

  if (!dbLoading && !dbData?.length) {
    return null
  }

  return (
    <View style={{ padding: 16 }}>
      {/* <Text style={styles.title}>{`${type}.${method}`}</Text> */}
      <Text
        style={[
          styles.title,
          {
            textTransform: "capitalize",
          },
        ]}
      >
        {type} ({dbData?.length ? dbData.length : ""})
      </Text>
      {dbLoading && <Loading />}
      {dbError && <Text>Error: {dbError.message}</Text>}
      {!!dbData?.length ? (
        renderItem(dbData)
      ) : (
        <Text
          style={{
            fontSize: 14,
            color: "grey",
          }}
        >
          No data found
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
