export enum SubscriptionPlan {
  Free = "Free",
  PremiumTrial = "Premium Trial",
  MonthlyStandard = "Monthly Standard",
  AnnualStandard = "Annual Standard",
}

export enum PeriodUnit {
  Day = "DAY",
  Week = "WEEK",
  Month = "MONTH",
  Year = "YEAR",
}

export enum SubscriptionOfferType {
  Introductory = "Introductory",
  Promotional = "Promotional",
  Regular = "Regular",
}

export interface SubscriptionFeature {
  type: SubscriptionOfferType
  cycles: number
  price: number
  periodUnit: PeriodUnit
  periodNumberOfUnits: number
}

export interface SubscriptionOptionPlan {
  id: string
  plan: SubscriptionPlan
  title: string
  currencyCode: string
  originalPrice: number // in USD or the relevant currency
  subscriptionPeriodUnit?: PeriodUnit
  features: SubscriptionFeature[] // list of features like "Save 50%", "7 Days Free", etc.
}
