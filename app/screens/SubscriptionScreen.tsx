import { useSubscriptionOptions } from "app/screens/subscription/useSubscriptionOptions"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface SubscriptionScreenProps extends AppStackScreenProps<"Subscription"> {}

export const SubscriptionScreen: FC<SubscriptionScreenProps> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState<string>("free")
  const subscriptionOptions = useSubscriptionOptions()

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

      <View style={$gridContainer}>
        {subscriptionOptions.map((option) => (
          <Button
            key={option.id}
            style={selectedOption === option.id ? $selectedOption : $option}
            onPress={() => handleSelectOption(option.id)}
          >
            <Text style={$optionText}>{option.name}</Text>
            <Text style={$priceText}>{option.price}</Text>
            <Text style={$descriptionText}>{option.description}</Text>
          </Button>
        ))}
      </View>

      <Button
        testID="next-button"
        style={$nextButton}
        preset="reversed"
        onPress={() => navigation.goBack()}
      >
        Confirm Selection
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
  fontSize: 24,
  fontWeight: "bold",
  color: colors.tint,
}

const $gridContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const $option: ViewStyle = {
  width: "48%",
  marginBottom: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.background,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.border,
}

const $selectedOption: ViewStyle = {
  ...$option,
  backgroundColor: colors.tint,
  borderColor: colors.tint,
}

const $optionText: TextStyle = {
  fontSize: 18,
  fontWeight: "600",
  color: colors.text,
}

const $priceText: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: colors.textDim,
}

const $descriptionText: TextStyle = {
  fontSize: 14,
  color: colors.textDim,
  marginTop: spacing.sm,
}

const $nextButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.tint,
}
