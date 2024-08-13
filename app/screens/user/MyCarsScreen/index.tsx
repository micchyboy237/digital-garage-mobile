import React, { useEffect, useState } from "react"
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native"
import { BackButton } from "../components/BackButton"
import { Car } from "./Car"

import { AntDesign } from "@expo/vector-icons"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { Loading } from "app/components/Loading"
import { MOCK_CARS_DATA } from "app/screens/digital-garage/data/mock-cars"
import { ScheduleByUser } from "app/screens/digital-garage/data/types"
import { typography } from "app/theme"
import { format, parseISO } from "date-fns"

const colors = {
  header: "#1B1B1F",

  background_primary: "#F4F5F6",
  background_secondary: "#FFFFFF",

  text: "#7A7A80",
  text_detail: "#AEAEB3",
  title: "#47474D",

  line: "#EBEBF0",

  main: "#DC1637",
  main_light: "#FDEDEF",
  success: "#03B252",

  shape: "#E1E1E8",
  shape_dark: "#29292E",
}

export function MyCarsScreen() {
  const [cars, setCars] = useState<ScheduleByUser[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const screenIsFocused = useIsFocused()
  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        // const res = await api.get("/rentals")
        const res = {
          data: MOCK_CARS_DATA.schedules_byuser,
        }
        const dataFormatted = res.data.map((data: ScheduleByUser) => {
          return {
            id: data.id,
            car: data.car,
            startDate: format(parseISO(data.startDate), "dd/MM/yyyy"),
            endDate: format(parseISO(data.endDate), "dd/MM/yyyy"),
          }
        })
        setCars(dataFormatted)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [screenIsFocused])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton onPress={handleGoBack} color={colors.shape} />

        <Text style={styles.title}>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Text>
        <Text style={styles.subTitle}>Conforto, segurança e praticidade.</Text>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.content}>
          <View style={styles.appointments}>
            <Text style={styles.appointmentsTitle}>Agendamentos</Text>
            <Text style={styles.appointmentsQuantity}>{cars.length}</Text>
          </View>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.carWrapper}>
                <Car data={item.car} />
                <View style={styles.carFooter}>
                  <Text style={styles.carFooterTitle}>Periodo</Text>
                  <View style={styles.carFooterPeriod}>
                    <Text style={styles.carFooterDate}>{item.startDate}</Text>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <Text style={styles.carFooterDate}>{item.endDate}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 325,
    backgroundColor: colors.header,
    justifyContent: "center",
    padding: 25,
    paddingTop: 30,
  },
  title: {
    color: colors.shape,
    fontFamily: typography.primary.semiBold,
    fontSize: 30,
    marginTop: 24,
  },
  subTitle: {
    color: colors.shape,
    fontFamily: typography.primary.normal,
    fontSize: 15,
    marginTop: 24,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  appointments: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
  },
  appointmentsTitle: {
    color: colors.text,
    fontFamily: typography.primary.normal,
    fontSize: 15,
  },
  appointmentsQuantity: {
    color: colors.title,
    fontFamily: typography.primary.medium,
    fontSize: 15,
  },
  carWrapper: {
    marginBottom: 16,
  },
  carFooter: {
    width: "100%",
    padding: 12,
    marginTop: -10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background_secondary,
  },
  carFooterTitle: {
    color: colors.text_detail,
    fontFamily: typography.primary.medium,
    fontSize: 10,
  },
  carFooterPeriod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carFooterDate: {
    color: colors.title,
    fontFamily: typography.primary.normal,
    fontSize: 13,
  },
})
