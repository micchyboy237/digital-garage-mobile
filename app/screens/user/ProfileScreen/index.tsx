import { Feather } from "@expo/vector-icons"
import { useNetInfo } from "@react-native-community/netinfo"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useAuth } from "app/screens/auth/useAuth"
import * as ImagePicker from "expo-image-picker"
import React, { useState } from "react"
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {
  BorderlessButton,
  GestureHandlerRootView,
  RectButton,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "styled-components"
import * as Yup from "yup"
import { useRootStackParamList } from "../../hooks/useRootStackParamList"
import { BackButton } from "../components/BackButton"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { InputPassword } from "../components/InputPassword"

export function Profile() {
  const netInfo = useNetInfo()
  const { user, signOut, updateUser } = useAuth()
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit")
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)
  const theme = useTheme()
  const navigation = useRootStackParamList()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Lembre-se de que se você sair, irá precisar de internet para conectar-se novamente.",
      [
        { text: "Cancelar", onPress: () => {}, style: "cancel" },
        {
          text: "Sair",
          onPress: () => {
            signOut()
          },
          style: "default",
        },
      ],
    )
  }

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    if (netInfo.isConnected === false && optionSelected === "passwordEdit") {
      Alert.alert("Você esta Offline", "Para mudar a senha, conecte-se a internet.")
    }

    setOption(optionSelected)
  }

  async function handleSelectAvatar() {
    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })) as ImagePicker.ImageInfo

    if (result.cancelled) {
      return
    }
    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
      })
      const data = { name, driverLicense }
      await schema.validate(data)
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      })
      Alert.alert("Perfil atualizado")
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message)
      } else {
        Alert.alert("Não foi possível atualizar o perfil", error.message)
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerTop}>
                  <BackButton color={theme.colors.shape} onPress={handleGoBack} />
                  <Text style={styles.headerTitle}>Editar Perfil</Text>
                  <BorderlessButton onPress={handleSignOut}>
                    <Feather name="power" size={24} color={theme.colors.shape} />
                  </BorderlessButton>
                </View>

                <View style={styles.photoContainer}>
                  {!!avatar && <Image source={{ uri: avatar }} style={styles.photo} />}
                  <RectButton style={styles.photoButton} onPress={handleSelectAvatar}>
                    <Feather name="camera" size={24} color={theme.colors.shape} />
                  </RectButton>
                </View>
              </View>

              <View style={[styles.content, { marginBottom: useBottomTabBarHeight() }]}>
                <View style={styles.options}>
                  <TouchableOpacity
                    style={[styles.option, option === "dataEdit" && styles.optionActive]}
                    onPress={() => handleOptionChange("dataEdit")}
                  >
                    <Text
                      style={[
                        styles.optionTitle,
                        option === "dataEdit" && styles.optionTitleActive,
                      ]}
                    >
                      Dados
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.option, option === "passwordEdit" && styles.optionActive]}
                    onPress={() => handleOptionChange("passwordEdit")}
                  >
                    <Text
                      style={[
                        styles.optionTitle,
                        option === "passwordEdit" && styles.optionTitleActive,
                      ]}
                    >
                      Trocar Senha
                    </Text>
                  </TouchableOpacity>
                </View>
                {option === "dataEdit" ? (
                  <View style={styles.section}>
                    <Input
                      iconName="user"
                      placeholder="Nome"
                      autoCorrect={false}
                      defaultValue={user.name}
                      onChangeText={setName}
                    />
                    <Input iconName="mail" editable={false} defaultValue={user.email} />
                    <Input
                      iconName="credit-card"
                      placeholder="CNH"
                      keyboardType="numeric"
                      defaultValue={user.driver_license}
                      onChangeText={setDriverLicense}
                    />
                  </View>
                ) : (
                  <View style={styles.section}>
                    <InputPassword iconName="lock" placeholder="Senha Atual" />
                    <InputPassword iconName="lock" placeholder="Nova Senha" />
                    <InputPassword iconName="lock" placeholder="Repetir Senha" />
                  </View>
                )}
                <Button title="Salvar Alterações" onPress={handleProfileUpdate} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background_primary,
  },
  header: {
    width: "100%",
    height: 227,
    backgroundColor: theme.colors.header,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getStatusBarHeight() + 32,
  },
  headerTitle: {
    fontSize: RFValue(25),
    fontFamily: theme.fonts.secondary_600,
    color: theme.colors.background_secondary,
  },
  photoContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: theme.colors.shape,
    marginTop: 48,
  },
  photo: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  photoButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.main,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  content: {
    paddingHorizontal: 24,
    marginTop: 122,
  },
  options: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  option: {
    paddingBottom: 14,
  },
  optionActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.main,
  },
  optionTitle: {
    fontSize: RFValue(20),
    fontFamily: theme.fonts.secondary_500,
    color: theme.colors.text_detail,
  },
  optionTitleActive: {
    fontFamily: theme.fonts.secondary_600,
    color: theme.colors.header,
  },
  section: {},
})
