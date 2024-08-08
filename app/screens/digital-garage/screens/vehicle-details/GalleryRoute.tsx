import { Document, EventType, VehicleOwnership } from "app/types"
import React from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

interface GalleryRouteProps {
  vehicleOwnership: VehicleOwnership
}

const GalleryRoute: React.FC<GalleryRouteProps> = ({ vehicleOwnership }) => {
  const { events } = vehicleOwnership

  const filteredEvents = events.filter((event) => event.type === EventType.post)

  const renderDocuments = (documents: Document[]) => {
    return documents.map((document) => {
      return (
        <View key={document.id}>
          {!!document.title && <Text>{document.title}</Text>}
          {!!document.description && <Text>{document.description}</Text>}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {document.files.map((file) => {
              return (
                <View key={file.id}>
                  <Image
                    style={{ width: 120, height: 120, backgroundColor: "#cccccc" }}
                    source={{ uri: file.url }}
                  />
                </View>
              )
            })}
          </View>
        </View>
      )
    })
  }

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Gallery</Text>
        {filteredEvents.map((event) => (
          <View key={event.id} style={styles.eventContainer}>
            <Text>{event.date.toDateString()}</Text>
            <Text style={styles.eventHeader}>{event.header}</Text>
            <Text>{event.description}</Text>
            {!!event.documents?.length && renderDocuments(event.documents)}
          </View>
        ))}
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
  eventHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default GalleryRoute
