/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import { ImagePicker } from "app/components/ImagePicker"
import { useBootstrap } from "app/screens/digital-garage/hooks/useBootstrap"
import { ImagePickerAsset } from "expo-image-picker"
import * as Linking from "expo-linking"
import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import Config from "./config"
import "./i18n"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import { TRPCProvider } from "./services/api"
import "./utils/ignoreWarnings"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
        DemoFeatures: "features",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
function App(props: AppProps) {
  const [displayPhoto, setDisplayPhoto] = useState<ImagePickerAsset | null>(null)
  const { hideSplashScreen } = props

  console.log("displayPhoto:", displayPhoto)

  const { isReady, initialNavigationState, onNavigationStateChange } = useBootstrap(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!isReady) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  const callUpload = async (formData: FormData) => {
    try {
      let response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })

      let jsonResponse = await response.json()
      if (response.ok) {
        alert("Upload successful!")
      } else {
        console.error(jsonResponse)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const callUploadS3 = async (formData: FormData) => {
    try {
      let response = await fetch("http://localhost:4000/uploadS3", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })

      let jsonResponse = await response.json()
      if (response.ok) {
        alert("Upload successful!")
      } else {
        console.error(jsonResponse)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const uploadImage = async (displayPhoto) => {
    console.log("Uploading image...", displayPhoto)
    if (!displayPhoto) return

    // Create a new form data
    const formData = new FormData()
    formData.append("displayPhoto", {
      uri: displayPhoto.uri,
      name: "displayPhoto.jpg",
      type: displayPhoto.mimeType,
    })
    formData.append("vehicleId", "1")
    formData.append("userId", "1")
    formData.append("description", "This is a test description")

    // const uploadResult = await callUpload(formData)
    // console.log("Upload result:", uploadResult)
    const uploadS3Result = await callUploadS3(formData)
    console.log("Upload S3 result:", uploadS3Result)
  }

  // otherwise, we're ready to render the app
  return (
    <TRPCProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <GestureHandlerRootView style={$container}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ImagePicker
                value={displayPhoto?.uri}
                onImageSelected={(file) => {
                  console.log("Image selected", file)
                  uploadImage(file)
                }}
                size={180}
                fullWidth
                icon="car"
              />
              {/* <Button
                  style={{
                    backgroundColor: colors.palette.primary400,
                  }}
                  preset="reversed"
                  onPress={uploadImage}
                >
                  Upload Image
                </Button> */}
            </View>
          </GestureHandlerRootView>
        </ErrorBoundary>
      </SafeAreaProvider>
    </TRPCProvider>
  )
}

export default App

const $container: ViewStyle = {
  flex: 1,
}
