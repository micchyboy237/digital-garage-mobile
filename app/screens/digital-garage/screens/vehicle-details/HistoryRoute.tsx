import { Document, EventType, MediaFile, MediaFileType, VehicleOwnership } from "app/types"
import React from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

interface HistoryRouteProps {
  vehicleOwnership: VehicleOwnership
}

const HistoryRoute: React.FC<HistoryRouteProps> = ({ vehicleOwnership }) => {
  const { vehicle, events } = vehicleOwnership

  const filteredEvents = events.filter((event) => event.type !== EventType.post)

  const renderMediaFile = (document: MediaFile) => {
    let DocumentComp = null
    if (document.type === MediaFileType.photo) {
      DocumentComp = (
        <Image style={{ width: "100%", height: "100%" }} source={{ uri: document.url }} />
      )
    }

    return (
      <View style={{ width: "100%", height: "100%" }} key={document.id}>
        {DocumentComp}
      </View>
    )
  }

  const renderDocuments = (documents: Document[]) => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {documents.map((document) => (
          <View key={document.id} style={{ width: 80, height: 80, backgroundColor: "#cccccc" }}>
            {/* {!!document.description && <Text>{document.description}</Text>} */}
            {document.files.map((file) => renderMediaFile(file))}
          </View>
        ))}
      </View>
    )
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>History</Text>
        {filteredEvents.map((event) => {
          let title = ""
          let backgroundColor = ""
          switch (event.type) {
            case EventType.invoice:
              title = "Invoice"
              backgroundColor = "#24C7FA"
              break
            case EventType.reminder:
              title = "Reminder"
              backgroundColor = "#FAB124"
              break
            case EventType.document:
              title = "Document"
              backgroundColor = "#0EBE5F"
              break
          }
          return (
            <View key={event.id} style={styles.eventContainer}>
              <View style={styles.eventHeaderContainer}>
                <Text>{event.date.toDateString()}</Text>
                <View style={[styles.eventTitleContainer, { backgroundColor }]}>
                  <Text style={styles.eventType}>{title}</Text>
                </View>
              </View>
              <Text style={styles.eventHeader}>{event.header}</Text>
              <Text>{event.description}</Text>
              {!!event.price && <Text>£{event.price || 0}</Text>}

              {!!event.documents?.length && renderDocuments(event.documents)}
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  eventContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitleContainer: {
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  eventType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  eventHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default HistoryRoute
