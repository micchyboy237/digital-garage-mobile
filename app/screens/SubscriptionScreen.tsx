import { SubscriptionOptionPlan } from "app/screens/subscription/types"
import { useSubscriptionOptions } from "app/screens/subscription/useSubscriptionOptions"
import React, { FC, useState } from "react"
import { Pressable, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing, typography } from "../theme"

interface SubscriptionScreenProps extends AppStackScreenProps<"Subscription"> {}

export const SubscriptionScreen: FC<SubscriptionScreenProps> = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState<string>("free")
  const subscriptionOptions = useSubscriptionOptions()

  const handleSelectOption = (optionId: string) => setSelectedOption(optionId)

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text preset="subheading" style={styles.header}>
        Choose Your Subscription Plan
      </Text>
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <View style={styles.row}>
          {subscriptionOptions.map((option, index) => (
            <View key={option.id} style={styles.column}>
              <SubscriptionOptionCard
                option={option}
                isSelected={selectedOption === option.id}
                onSelect={() => handleSelectOption(option.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <Button
        testID="confirm-button"
        style={styles.confirmButton}
        preset="reversed"
        onPress={() => navigation.goBack()}
      >
        Confirm Selection
      </Button>
    </Screen>
  )
}

const SubscriptionOptionCard: FC<{
  option: SubscriptionOptionPlan
  isSelected: boolean
  onSelect: () => void
}> = ({ option, isSelected, onSelect }) => (
  <Pressable
    style={[styles.optionCard, isSelected && styles.selectedOptionCard]}
    onPress={onSelect}
  >
    <View style={styles.optionHeader}>
      <Text style={styles.optionTitle}>{option.title}</Text>
      <Text style={styles.optionPrice}>
        {option.currencyCode} {option.originalPrice}
      </Text>
    </View>

    <View style={styles.featuresContainer}>
      {option.features.map((feature, index) => (
        <View key={index} style={styles.featureRow}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.optionFeature}>{feature}</Text>
        </View>
      ))}
    </View>
  </Pressable>
)

const styles = {
  screenContentContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  } as ViewStyle,
  header: {
    marginBottom: spacing.md,
    textAlign: "center",
    fontSize: 22, // Reduced from 26
    fontWeight: "bold",
    color: colors.tint,
  } as TextStyle,
  optionsContainer: {
    paddingBottom: spacing.lg, // Reduced from spacing.xxl
  } as ViewStyle,
  row: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
  } as ViewStyle,
  column: {
    // width: "48%",
    marginBottom: spacing.sm, // Reduced from spacing.md
  } as ViewStyle,
  optionCard: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8, // Reduced from 12
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow offset and radius
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,
  selectedOptionCard: {
    backgroundColor: colors.palette.primary100,
    borderColor: colors.palette.primary400,
  } as ViewStyle,
  optionHeader: {
    flex: 1,
    padding: spacing.sm, // Reduced from spacing.md
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  } as ViewStyle,
  optionTitle: {
    fontSize: 18, // Reduced from 20
    fontFamily: typography.primary.medium,
    color: colors.text,
  } as TextStyle,
  optionPrice: {
    fontSize: 16, // Reduced from 18
    fontFamily: typography.primary.bold,
    color: colors.tint,
  } as TextStyle,
  featuresContainer: {
    flex: 1,
    padding: spacing.sm, // Reduced from spacing.md
    borderTopWidth: 1,
    borderTopColor: colors.separator,
  } as ViewStyle,
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xxs, // Reduced from spacing.xs
  } as ViewStyle,
  bulletPoint: {
    fontSize: 12, // Reduced from 14
    color: colors.textDim,
    marginRight: spacing.xxs, // Reduced from spacing.xs
  } as TextStyle,
  optionFeature: {
    fontSize: 12, // Reduced from 14
    fontFamily: typography.primary.normal,
    color: colors.textDim,
    flex: 1,
  } as TextStyle,
  confirmButton: {
    marginTop: spacing.xl, // Reduced from spacing.xxl
    backgroundColor: colors.palette.primary400,
    borderRadius: 6, // Reduced from 8
    paddingVertical: spacing.sm, // Reduced from spacing.md
  } as ViewStyle,
}
