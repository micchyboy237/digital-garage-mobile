import { Loading } from "app/components/Loading"
import { trpc } from "app/services/api"
import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

export function DBTab({ routesData, renderNestedObject }) {
  const dbRoutes = routesData?.filter((route) => route.key.includes(".findMany")) || []

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.innerContainer}>
          {dbRoutes.map((route) => {
            const dbType = route.key.slice(0, route.key.lastIndexOf("."))
            const dbMethod = route.key.slice(route.key.lastIndexOf(".") + 1)

            return (
              <View key={route.key}>
                <InnerDBTab type={dbType} method={dbMethod} renderItem={renderNestedObject} />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

function InnerDBTab({
  type,
  method,
  renderItem,
}: {
  type: string
  method: string
  renderItem: (obj: any) => any
}) {
  const { data: dbData, error: dbError, isLoading: dbLoading } = trpc[type][method].useQuery({})

  if (!dbLoading && !dbData?.length) {
    return null
  }

  return (
    <View style={styles.innerDBTabContainer}>
      <Text style={styles.title}>
        {type} ({dbData?.length ? dbData.length : ""})
      </Text>
      {dbLoading && <Loading />}
      {dbError && <Text>Error: {dbError.message}</Text>}
      {!!dbData?.length ? renderItem(dbData) : <Text style={styles.noDataText}>No data found</Text>}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  scrollViewContent: {
    padding: 16,
  },
  innerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  innerDBTabContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
  },
  noDataText: {
    fontSize: 14,
    color: "grey",
  },
})
