import { useStores } from "app/models"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

interface SubscriptionScreenProps extends AppStackScreenProps<"Subscription"> {}

const subscriptionOptions = {
  free: { id: "free", name: "Free Account", price: "£0.00" },
  trial: { id: "trial", name: "Premium 14-day trial (1-3 vehicles)", price: "£0.00" },
  monthly: [
    { id: "monthly-1", name: "Monthly Standard (1-3 vehicles)", price: "£4.99" },
    { id: "monthly-2", name: "Monthly Premium (up to 7 vehicles)", price: "£6.99" },
    { id: "monthly-3", name: "Monthly Premium Plus (up to 12 vehicles)", price: "£9.99" },
  ],
  annual: [
    { id: "annual-1", name: "Annual Standard (1-3 vehicles)", price: "£49.99" },
    { id: "annual-2", name: "Annual Premium (up to 7 vehicles)", price: "£69.99" },
    { id: "annual-3", name: "Annual Premium Plus (up to 12 vehicles)", price: "£99.99" },
  ],
}

export const SubscriptionScreen: FC<SubscriptionScreenProps> = function SubscriptionScreen({
  navigation,
}) {
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  function handleNext() {
    if (step === 1) {
      if (selectedOption === "free" || selectedOption === "trial") {
        // We'll mock this with a fake token.
        setAuthToken(String(Date.now()))
      } else {
        setStep(2)
      }
    } else if (step === 2 && selectedOption) {
      // Handle subscription logic here
      // We'll mock this with a fake token.
      setAuthToken(String(Date.now()))
    }
  }

  function handleSelectOption(optionId: string) {
    setSelectedOption(optionId)
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
      <View>
        <Text preset="subheading" style={$enterDetails}>
          Subscription
        </Text>
      </View>

      {step === 1 && (
        <View>
          <Text style={$stepTitle}>Step 1: Choose your plan type</Text>
          <Button
            style={selectedOption === "free" ? $selectedOption : $option}
            onPress={() => handleSelectOption("free")}
          >
            {subscriptionOptions.free.name} - {subscriptionOptions.free.price}
          </Button>
          <Button
            style={selectedOption === "trial" ? $selectedOption : $option}
            onPress={() => handleSelectOption("trial")}
          >
            {subscriptionOptions.trial.name} - {subscriptionOptions.trial.price}
          </Button>
          <Button
            style={selectedOption === "monthly" ? $selectedOption : $option}
            onPress={() => handleSelectOption("monthly")}
          >
            Monthly Plans
          </Button>
          <Button
            style={selectedOption === "annual" ? $selectedOption : $option}
            onPress={() => handleSelectOption("annual")}
          >
            Annual Plans
          </Button>
        </View>
      )}

      {step === 2 && selectedOption?.startsWith("monthly") && (
        <View>
          <Text style={$stepTitle}>Step 2: Choose your monthly plan</Text>
          {subscriptionOptions.monthly.map((option) => (
            <Button
              key={option.id}
              style={selectedOption === option.id ? $selectedOption : $option}
              onPress={() => handleSelectOption(option.id)}
            >
              {option.name} - {option.price}
            </Button>
          ))}
        </View>
      )}

      {step === 2 && selectedOption?.startsWith("annual") && (
        <View>
          <Text style={$stepTitle}>Step 2: Choose your annual plan</Text>
          {subscriptionOptions.annual.map((option) => (
            <Button
              key={option.id}
              style={selectedOption === option.id ? $selectedOption : $option}
              onPress={() => handleSelectOption(option.id)}
            >
              {option.name} - {option.price}
            </Button>
          ))}
        </View>
      )}

      <Button testID="next-button" style={$nextButton} preset="reversed" onPress={handleNext}>
        {step === 1 ? "Next" : "Submit"}
      </Button>
    </Screen>
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
  textAlign: "center",
}

const $stepTitle: TextStyle = {
  marginBottom: spacing.md,
  textAlign: "center",
  fontSize: 18,
  fontWeight: "bold",
}

const $option: ViewStyle = {
  marginBottom: spacing.sm,
  padding: spacing.md,
  backgroundColor: "#f0f0f0",
  borderRadius: 8,
}

const $selectedOption: ViewStyle = {
  marginBottom: spacing.sm,
  padding: spacing.md,
  backgroundColor: "#d0d0d0",
  borderRadius: 8,
}

const $nextButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: "#BE0E8DDE",
}
