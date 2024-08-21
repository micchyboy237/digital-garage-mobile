## await Purchases.getAppUserID()
App User ID "dg.tester1@gmail.com"

## await Purchases.isAnonymous()
Is Anonymous false

## await Purchases.canMakePayments()
Can make payments true

## await Purchases.getCustomerInfo()
```
{
  "allPurchasedProductIdentifiers": [
    "rc_dg_monthly_standard_4.99"
  ],
  "allExpirationDates": {
    "rc_dg_monthly_standard_4.99": "2024-09-10T17:33:36Z"
  },
  "originalAppUserId": "$RCAnonymousID:7b76392a8afd4258ab335dc3b5e74c7d",
  "originalApplicationVersion": "1",
  "activeSubscriptions": [
    "rc_dg_monthly_standard_4.99"
  ],
  "allExpirationDatesMillis": {
    "rc_dg_monthly_standard_4.99": 1725989616000
  },
  "requestDateMillis": 1723314435000,
  "latestExpirationDate": "2024-09-10T17:33:36Z",
  "originalPurchaseDateMillis": 0,
  "allPurchaseDates": {
    "rc_dg_monthly_standard_4.99": "2024-08-10T17:33:36Z"
  },
  "managementURL": "https://apps.apple.com/account/subscriptions",
  "firstSeen": "2024-07-29T08:06:02Z",
  "latestExpirationDateMillis": 1725989616000,
  "requestDate": "2024-08-10T18:27:15Z",
  "entitlements": {
    "active": {
      "Digital Garage Entitlement": {
        "productIdentifier": "rc_dg_monthly_standard_4.99",
        "expirationDateMillis": 1725989616000,
        "originalPurchaseDateMillis": 1723311216000,
        "latestPurchaseDate": "2024-08-10T17:33:36Z",
        "expirationDate": "2024-09-10T17:33:36Z",
        "latestPurchaseDateMillis": 1723311216000,
        "isSandbox": true,
        "isActive": true,
        "store": "APP_STORE",
        "unsubscribeDetectedAt": null,
        "periodType": "NORMAL",
        "identifier": "Digital Garage Entitlement",
        "productPlanIdentifier": null,
        "originalPurchaseDate": "2024-08-10T17:33:36Z",
        "verification": "VERIFIED",
        "billingIssueDetectedAtMillis": null,
        "unsubscribeDetectedAtMillis": null,
        "billingIssueDetectedAt": null,
        "willRenew": true,
        "ownershipType": "PURCHASED"
      }
    },
    "all": {
      "Digital Garage Entitlement": {
        "billingIssueDetectedAtMillis": null,
        "productIdentifier": "rc_dg_monthly_standard_4.99",
        "ownershipType": "PURCHASED",
        "willRenew": true,
        "verification": "VERIFIED",
        "originalPurchaseDate": "2024-08-10T17:33:36Z",
        "latestPurchaseDate": "2024-08-10T17:33:36Z",
        "periodType": "NORMAL",
        "unsubscribeDetectedAt": null,
        "store": "APP_STORE",
        "identifier": "Digital Garage Entitlement",
        "productPlanIdentifier": null,
        "isActive": true,
        "latestPurchaseDateMillis": 1723311216000,
        "isSandbox": true,
        "expirationDate": "2024-09-10T17:33:36Z",
        "unsubscribeDetectedAtMillis": null,
        "billingIssueDetectedAt": null,
        "originalPurchaseDateMillis": 1723311216000,
        "expirationDateMillis": 1725989616000
      }
    },
    "verification": "VERIFIED"
  },
  "allPurchaseDatesMillis": {
    "rc_dg_monthly_standard_4.99": 1723311216000
  },
  "firstSeenMillis": 1722240362000,
  "nonSubscriptionTransactions": [],
  "originalPurchaseDate": "1970-01-01T00:00:00Z"
}
```

## await Purchases.logIn("dg.tester1@gmail.com")
```
{
  "created": false,
  "customerInfo": {
    "activeSubscriptions": [
      "rc_dg_monthly_standard_4.99"
    ],
    "originalApplicationVersion": "1",
    "allPurchaseDatesMillis": {
      "rc_dg_monthly_standard_4.99": 1723311216000
    },
    "requestDate": "2024-08-10T18:27:15Z",
    "firstSeenMillis": 1722240362000,
    "firstSeen": "2024-07-29T08:06:02Z",
    "latestExpirationDateMillis": 1725989616000,
    "allExpirationDatesMillis": {
      "rc_dg_monthly_standard_4.99": 1725989616000
    },
    "requestDateMillis": 1723314435000,
    "latestExpirationDate": "2024-09-10T17:33:36Z",
    "originalPurchaseDateMillis": 0,
    "originalAppUserId": "$RCAnonymousID:7b76392a8afd4258ab335dc3b5e74c7d",
    "allExpirationDates": {
      "rc_dg_monthly_standard_4.99": "2024-09-10T17:33:36Z"
    },
    "nonSubscriptionTransactions": [],
    "originalPurchaseDate": "1970-01-01T00:00:00Z",
    "allPurchaseDates": {
      "rc_dg_monthly_standard_4.99": "2024-08-10T17:33:36Z"
    },
    "managementURL": "https://apps.apple.com/account/subscriptions",
    "entitlements": {
      "verification": "VERIFIED",
      "all": {
        "Digital Garage Entitlement": {
          "willRenew": true,
          "ownershipType": "PURCHASED",
          "expirationDate": "2024-09-10T17:33:36Z",
          "latestPurchaseDateMillis": 1723311216000,
          "isSandbox": true,
          "productPlanIdentifier": null,
          "identifier": "Digital Garage Entitlement",
          "unsubscribeDetectedAt": null,
          "periodType": "NORMAL",
          "isActive": true,
          "store": "APP_STORE",
          "expirationDateMillis": 1725989616000,
          "originalPurchaseDateMillis": 1723311216000,
          "billingIssueDetectedAtMillis": null,
          "originalPurchaseDate": "2024-08-10T17:33:36Z",
          "verification": "VERIFIED",
          "productIdentifier": "rc_dg_monthly_standard_4.99",
          "latestPurchaseDate": "2024-08-10T17:33:36Z",
          "unsubscribeDetectedAtMillis": null,
          "billingIssueDetectedAt": null
        }
      },
      "active": {
        "Digital Garage Entitlement": {
          "originalPurchaseDateMillis": 1723311216000,
          "unsubscribeDetectedAtMillis": null,
          "billingIssueDetectedAt": null,
          "expirationDateMillis": 1725989616000,
          "productIdentifier": "rc_dg_monthly_standard_4.99",
          "latestPurchaseDate": "2024-08-10T17:33:36Z",
          "isActive": true,
          "identifier": "Digital Garage Entitlement",
          "unsubscribeDetectedAt": null,
          "store": "APP_STORE",
          "productPlanIdentifier": null,
          "periodType": "NORMAL",
          "latestPurchaseDateMillis": 1723311216000,
          "isSandbox": true,
          "originalPurchaseDate": "2024-08-10T17:33:36Z",
          "verification": "VERIFIED",
          "billingIssueDetectedAtMillis": null,
          "ownershipType": "PURCHASED",
          "willRenew": true,
          "expirationDate": "2024-09-10T17:33:36Z"
        }
      }
    },
    "allPurchasedProductIdentifiers": [
      "rc_dg_monthly_standard_4.99"
    ]
  }
}
```

## await Purchases.getProducts(["rc_dg_monthly_standard_4.99"])
```
[
  {
    "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
    "title": "",
    "pricePerMonthString": "£4.99",
    "pricePerYearString": "£59.88",
    "description": "",
    "pricePerYear": 59.879999999999995,
    "pricePerWeekString": "£1.14",
    "subscriptionPeriod": "P1M",
    "price": 4.99,
    "productCategory": "SUBSCRIPTION",
    "currencyCode": "GBP",
    "introPrice": null,
    "pricePerWeek": 1.1400000000000001,
    "priceString": "£4.99",
    "pricePerMonth": 4.99,
    "identifier": "rc_dg_monthly_standard_4.99",
    "discounts": []
  }
]
```

## await Purchases.purchaseProduct(productId)
Successful subscription | Selecting Manage
```
{
  "customerInfo": {
    "requestDate": "2024-08-10T17:35:29Z",
    "allExpirationDates": {
      "rc_dg_monthly_standard_4.99": "2024-09-10T17:33:36Z"
    },
    "originalAppUserId": "$RCAnonymousID:7b76392a8afd4258ab335dc3b5e74c7d",
    "latestExpirationDateMillis": 1725989616000,
    "managementURL": "https://apps.apple.com/account/subscriptions",
    "allPurchaseDates": {
      "rc_dg_monthly_standard_4.99": "2024-08-10T17:33:36Z"
    },
    "activeSubscriptions": ["rc_dg_monthly_standard_4.99"],
    "originalApplicationVersion": "1",
    "allPurchasedProductIdentifiers": ["rc_dg_monthly_standard_4.99"],
    "firstSeenMillis": 1722240362000,
    "firstSeen": "2024-07-29T08:06:02Z",
    "allPurchaseDatesMillis": {
      "rc_dg_monthly_standard_4.99": 1723311216000
    },
    "latestExpirationDate": "2024-09-10T17:33:36Z",
    "allExpirationDatesMillis": {
      "rc_dg_monthly_standard_4.99": 1725989616000
    },
    "originalPurchaseDateMillis": 0,
    "requestDateMillis": 1723311329029,
    "entitlements": {
      "all": {
        "Digital Garage Entitlement": {
          "productIdentifier": "rc_dg_monthly_standard_4.99",
          "originalPurchaseDateMillis": 1723311216000,
          "billingIssueDetectedAtMillis": null,
          "expirationDate": "2024-09-10T17:33:36Z",
          "ownershipType": "PURCHASED",
          "willRenew": true,
          "isActive": true,
          "productPlanIdentifier": null,
          "unsubscribeDetectedAt": null,
          "periodType": "NORMAL",
          "store": "APP_STORE",
          "identifier": "Digital Garage Entitlement",
          "verification": "VERIFIED",
          "originalPurchaseDate": "2024-08-10T17:33:36Z",
          "latestPurchaseDateMillis": 1723311216000,
          "isSandbox": true,
          "billingIssueDetectedAt": null,
          "unsubscribeDetectedAtMillis": null,
          "expirationDateMillis": 1725989616000,
          "latestPurchaseDate": "2024-08-10T17:33:36Z"
        }
      },
      "verification": "VERIFIED",
      "active": {
        "Digital Garage Entitlement": {
          "productIdentifier": "rc_dg_monthly_standard_4.99",
          "expirationDateMillis": 1725989616000,
          "unsubscribeDetectedAtMillis": null,
          "billingIssueDetectedAt": null,
          "latestPurchaseDateMillis": 1723311216000,
          "isSandbox": true,
          "productPlanIdentifier": null,
          "store": "APP_STORE",
          "periodType": "NORMAL",
          "identifier": "Digital Garage Entitlement",
          "unsubscribeDetectedAt": null,
          "isActive": true,
          "billingIssueDetectedAtMillis": null,
          "verification": "VERIFIED",
          "originalPurchaseDate": "2024-08-10T17:33:36Z",
          "willRenew": true,
          "ownershipType": "PURCHASED",
          "latestPurchaseDate": "2024-08-10T17:33:36Z",
          "originalPurchaseDateMillis": 1723311216000,
          "expirationDate": "2024-09-10T17:33:36Z"
        }
      }
    },
    "originalPurchaseDate": "1970-01-01T00:00:00Z",
    "nonSubscriptionTransactions": []
  },
  "transaction": {
    "revenueCatId": "0",
    "transactionIdentifier": "0",
    "productIdentifier": "rc_dg_monthly_standard_4.99",
    "purchaseDate": "2024-08-10T17:33:36Z",
    "productId": "rc_dg_monthly_standard_4.99",
    "purchaseDateMillis": 1723311216152
  },
  "productIdentifier": "rc_dg_monthly_standard_4.99"
}
```

## await Purchases.purchaseProduct(productId)
Selecting OK
```
{
  "productIdentifier": "rc_dg_monthly_standard_4.99",
  "transaction": {
    "purchaseDateMillis": 1723311216152,
    "productId": "rc_dg_monthly_standard_4.99",
    "productIdentifier": "rc_dg_monthly_standard_4.99",
    "purchaseDate": "2024-08-10T17:33:36Z",
    "revenueCatId": "0",
    "transactionIdentifier": "0"
  },
  "customerInfo": {
    "allPurchasedProductIdentifiers": ["rc_dg_monthly_standard_4.99"],
    "managementURL": "https://apps.apple.com/account/subscriptions",
    "allPurchaseDates": {
      "rc_dg_monthly_standard_4.99": "2024-08-10T17:33:36Z"
    },
    "requestDate": "2024-08-10T17:36:47Z",
    "originalApplicationVersion": "1",
    "activeSubscriptions": ["rc_dg_monthly_standard_4.99"],
    "latestExpirationDate": "2024-09-10T17:33:36Z",
    "allExpirationDatesMillis": {
      "rc_dg_monthly_standard_4.99": 1725989616000
    },
    "requestDateMillis": 1723311407831,
    "originalPurchaseDateMillis": 0,
    "originalPurchaseDate": "1970-01-01T00:00:00Z",
    "nonSubscriptionTransactions": [],
    "allExpirationDates": {
      "rc_dg_monthly_standard_4.99": "2024-09-10T17:33:36Z"
    },
    "originalAppUserId": "$RCAnonymousID:7b76392a8afd4258ab335dc3b5e74c7d",
    "firstSeenMillis": 1722240362000,
    "firstSeen": "2024-07-29T08:06:02Z",
    "latestExpirationDateMillis": 1725989616000,
    "entitlements": {
      "active": {
        "Digital Garage Entitlement": {
          "expirationDateMillis": 1725989616000,
          "latestPurchaseDate": "2024-08-10T17:33:36Z",
          "unsubscribeDetectedAtMillis": null,
          "billingIssueDetectedAt": null,
          "ownershipType": "PURCHASED",
          "willRenew": true,
          "billingIssueDetectedAtMillis": null,
          "originalPurchaseDateMillis": 1723311216000,
          "expirationDate": "2024-09-10T17:33:36Z",
          "store": "APP_STORE",
          "periodType": "NORMAL",
          "isActive": true,
          "unsubscribeDetectedAt": null,
          "productPlanIdentifier": null,
          "identifier": "Digital Garage Entitlement",
          "isSandbox": true,
          "latestPurchaseDateMillis": 1723311216000,
          "productIdentifier": "rc_dg_monthly_standard_4.99",
          "verification": "VERIFIED",
          "originalPurchaseDate": "2024-08-10T17:33:36Z"
        }
      },
      "verification": "VERIFIED",
      "all": {
        "Digital Garage Entitlement": {
          "productIdentifier": "rc_dg_monthly_standard_4.99",
          "unsubscribeDetectedAtMillis": null,
          "billingIssueDetectedAt": null,
          "originalPurchaseDate": "2024-08-10T17:33:36Z",
          "verification": "VERIFIED",
          "productPlanIdentifier": null,
          "periodType": "NORMAL",
          "store": "APP_STORE",
          "isActive": true,
          "identifier": "Digital Garage Entitlement",
          "unsubscribeDetectedAt": null,
          "expirationDate": "2024-09-10T17:33:36Z",
          "willRenew": true,
          "ownershipType": "PURCHASED",
          "expirationDateMillis": 1725989616000,
          "originalPurchaseDateMillis": 1723311216000,
          "latestPurchaseDateMillis": 1723311216000,
          "isSandbox": true,
          "billingIssueDetectedAtMillis": null,
          "latestPurchaseDate": "2024-08-10T17:33:36Z"
        }
      }
    },
    "allPurchaseDatesMillis": {
      "rc_dg_monthly_standard_4.99": 1723311216000
    }
  }
}
```

## await Purchases.getOfferings()
```
{
  "all": {
    "Digital Garage Premium": {
      "metadata": {
        "backgroundColor": "#BE0E8DDE"
      },
      "serverDescription": "1st premium set of packages",
      "identifier": "Digital Garage Premium",
      "availablePackages": [
        {
          "offeringIdentifier": "Digital Garage Premium",
          "packageType": "CUSTOM",
          "product": {
            "title": "",
            "pricePerMonthString": "£4.99",
            "pricePerYearString": "£59.88",
            "description": "",
            "discounts": [
              {
                "cycles": 3,
                "periodUnit": "MONTH",
                "periodNumberOfUnits": 1,
                "priceString": "£3.99",
                "period": "P1M",
                "identifier": "rc_dg_promo_premium_reduced_3months_3.99",
                "price": 3.9899999999999998
              }
            ],
            "pricePerYear": 59.879999999999995,
            "productCategory": "SUBSCRIPTION",
            "price": 4.99,
            "identifier": "rc_dg_premium_trial_14d_3.99_4.99",
            "pricePerWeek": 1.1400000000000001,
            "introPrice": null,
            "currencyCode": "GBP",
            "pricePerWeekString": "£1.14",
            "subscriptionPeriod": "P1M",
            "priceString": "£4.99",
            "pricePerMonth": 4.99,
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION"
          },
          "identifier": "Premium 14-day trial",
          "presentedOfferingContext": {
            "offeringIdentifier": "Digital Garage Premium",
            "targetingContext": null,
            "placementIdentifier": null
          }
        },
        {
          "product": {
            "pricePerYearString": "£59.88",
            "description": "",
            "productCategory": "SUBSCRIPTION",
            "price": 4.99,
            "priceString": "£4.99",
            "pricePerMonth": 4.99,
            "pricePerMonthString": "£4.99",
            "title": "",
            "discounts": [],
            "introPrice": null,
            "currencyCode": "GBP",
            "pricePerWeek": 1.1400000000000001,
            "identifier": "rc_dg_monthly_standard_4.99",
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
            "subscriptionPeriod": "P1M",
            "pricePerWeekString": "£1.14",
            "pricePerYear": 59.879999999999995
          },
          "presentedOfferingContext": {
            "placementIdentifier": null,
            "offeringIdentifier": "Digital Garage Premium",
            "targetingContext": null
          },
          "identifier": "Monthly Standard",
          "offeringIdentifier": "Digital Garage Premium",
          "packageType": "CUSTOM"
        },
        {
          "packageType": "CUSTOM",
          "identifier": "Monthly Premium",
          "presentedOfferingContext": {
            "placementIdentifier": null,
            "targetingContext": null,
            "offeringIdentifier": "Digital Garage Premium"
          },
          "offeringIdentifier": "Digital Garage Premium",
          "product": {
            "priceString": "£6.99",
            "pricePerMonth": 6.99,
            "identifier": "rc_dg_monthly_premium_6.99",
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
            "discounts": [],
            "pricePerYearString": "£83.88",
            "description": "",
            "title": "",
            "pricePerMonthString": "£6.99",
            "pricePerYear": 83.88,
            "pricePerWeekString": "£1.60",
            "subscriptionPeriod": "P1M",
            "pricePerWeek": 1.6,
            "introPrice": null,
            "currencyCode": "GBP",
            "productCategory": "SUBSCRIPTION",
            "price": 6.99
          }
        },
        {
          "packageType": "CUSTOM",
          "identifier": "Monthly Premium Plus",
          "presentedOfferingContext": {
            "targetingContext": null,
            "offeringIdentifier": "Digital Garage Premium",
            "placementIdentifier": null
          },
          "offeringIdentifier": "Digital Garage Premium",
          "product": {
            "pricePerYearString": "£119.88",
            "description": "",
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
            "discounts": [],
            "price": 9.99,
            "productCategory": "SUBSCRIPTION",
            "pricePerMonth": 9.99,
            "priceString": "£9.99",
            "pricePerWeekString": "£2.29",
            "subscriptionPeriod": "P1M",
            "currencyCode": "GBP",
            "introPrice": null,
            "pricePerWeek": 2.29,
            "title": "",
            "pricePerMonthString": "£9.99",
            "identifier": "rc_dg_monthly_premium_plus_9.99",
            "pricePerYear": 119.88
          }
        },
        {
          "packageType": "CUSTOM",
          "offeringIdentifier": "Digital Garage Premium",
          "product": {
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
            "identifier": "rc_dg_annual_standard_49.99",
            "title": "",
            "pricePerMonthString": "£4.16",
            "pricePerYearString": "£49.99",
            "description": "",
            "priceString": "£49.99",
            "pricePerMonth": 4.16,
            "introPrice": null,
            "pricePerWeek": 0.95,
            "currencyCode": "GBP",
            "pricePerYear": 49.989999999999995,
            "pricePerWeekString": "£0.95",
            "subscriptionPeriod": "P1Y",
            "productCategory": "SUBSCRIPTION",
            "discounts": [],
            "price": 49.989999999999995
          },
          "identifier": "Annual Standard",
          "presentedOfferingContext": {
            "placementIdentifier": null,
            "offeringIdentifier": "Digital Garage Premium",
            "targetingContext": null
          }
        },
        {
          "packageType": "CUSTOM",
          "offeringIdentifier": "Digital Garage Premium",
          "presentedOfferingContext": {
            "offeringIdentifier": "Digital Garage Premium",
            "targetingContext": null,
            "placementIdentifier": null
          },
          "identifier": "Annual Premium",
          "product": {
            "pricePerWeek": 1.34,
            "currencyCode": "GBP",
            "introPrice": null,
            "pricePerWeekString": "£1.34",
            "subscriptionPeriod": "P1Y",
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
            "discounts": [],
            "title": "",
            "pricePerMonthString": "£5.83",
            "pricePerYearString": "£69.99",
            "description": "",
            "price": 69.99,
            "productCategory": "SUBSCRIPTION",
            "pricePerMonth": 5.83,
            "priceString": "£69.99",
            "pricePerYear": 69.99,
            "identifier": "rc_dg_annual_premium_69.99"
          }
        },
        {
          "offeringIdentifier": "Digital Garage Premium",
          "packageType": "CUSTOM",
          "presentedOfferingContext": {
            "targetingContext": null,
            "offeringIdentifier": "Digital Garage Premium",
            "placementIdentifier": null
          },
          "identifier": "Annual Premium Plus",
          "product": {
            "pricePerYear": 99.99,
            "pricePerWeekString": "£1.91",
            "subscriptionPeriod": "P1Y",
            "title": "",
            "pricePerMonthString": "£8.33",
            "pricePerYearString": "£99.99",
            "description": "",
            "discounts": [],
            "pricePerMonth": 8.33,
            "priceString": "£99.99",
            "productCategory": "SUBSCRIPTION",
            "currencyCode": "GBP",
            "introPrice": null,
            "pricePerWeek": 1.9100000000000001,
            "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
            "price": 99.99,
            "identifier": "rc_dg_annual_premium_plus_99.99"
          }
        }
      ]
    }
  },
  "current": {
    "availablePackages": [
      {
        "presentedOfferingContext": {
          "targetingContext": null,
          "offeringIdentifier": "Digital Garage Premium",
          "placementIdentifier": null
        },
        "identifier": "Premium 14-day trial",
        "product": {
          "productCategory": "SUBSCRIPTION",
          "discounts": [
            {
              "price": 3.9899999999999998,
              "periodNumberOfUnits": 1,
              "priceString": "£3.99",
              "period": "P1M",
              "cycles": 3,
              "identifier": "rc_dg_promo_premium_reduced_3months_3.99",
              "periodUnit": "MONTH"
            }
          ],
          "identifier": "rc_dg_premium_trial_14d_3.99_4.99",
          "pricePerMonth": 4.99,
          "priceString": "£4.99",
          "description": "",
          "pricePerYearString": "£59.88",
          "pricePerMonthString": "£4.99",
          "title": "",
          "pricePerYear": 59.879999999999995,
          "currencyCode": "GBP",
          "pricePerWeek": 1.1400000000000001,
          "introPrice": null,
          "pricePerWeekString": "£1.14",
          "subscriptionPeriod": "P1M",
          "price": 4.99,
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION"
        },
        "packageType": "CUSTOM",
        "offeringIdentifier": "Digital Garage Premium"
      },
      {
        "product": {
          "productCategory": "SUBSCRIPTION",
          "price": 4.99,
          "pricePerYear": 59.879999999999995,
          "subscriptionPeriod": "P1M",
          "pricePerWeekString": "£1.14",
          "introPrice": null,
          "currencyCode": "GBP",
          "pricePerWeek": 1.1400000000000001,
          "pricePerMonth": 4.99,
          "priceString": "£4.99",
          "discounts": [],
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
          "title": "",
          "pricePerMonthString": "£4.99",
          "identifier": "rc_dg_monthly_standard_4.99",
          "description": "",
          "pricePerYearString": "£59.88"
        },
        "offeringIdentifier": "Digital Garage Premium",
        "identifier": "Monthly Standard",
        "presentedOfferingContext": {
          "targetingContext": null,
          "offeringIdentifier": "Digital Garage Premium",
          "placementIdentifier": null
        },
        "packageType": "CUSTOM"
      },
      {
        "product": {
          "productCategory": "SUBSCRIPTION",
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
          "pricePerYearString": "£83.88",
          "description": "",
          "discounts": [],
          "pricePerWeek": 1.6,
          "introPrice": null,
          "currencyCode": "GBP",
          "priceString": "£6.99",
          "pricePerMonth": 6.99,
          "pricePerYear": 83.88,
          "subscriptionPeriod": "P1M",
          "pricePerWeekString": "£1.60",
          "price": 6.99,
          "pricePerMonthString": "£6.99",
          "title": "",
          "identifier": "rc_dg_monthly_premium_6.99"
        },
        "presentedOfferingContext": {
          "placementIdentifier": null,
          "targetingContext": null,
          "offeringIdentifier": "Digital Garage Premium"
        },
        "identifier": "Monthly Premium",
        "offeringIdentifier": "Digital Garage Premium",
        "packageType": "CUSTOM"
      },
      {
        "packageType": "CUSTOM",
        "identifier": "Monthly Premium Plus",
        "presentedOfferingContext": {
          "placementIdentifier": null,
          "offeringIdentifier": "Digital Garage Premium",
          "targetingContext": null
        },
        "product": {
          "identifier": "rc_dg_monthly_premium_plus_9.99",
          "discounts": [],
          "price": 9.99,
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
          "introPrice": null,
          "pricePerWeek": 2.29,
          "currencyCode": "GBP",
          "pricePerMonth": 9.99,
          "priceString": "£9.99",
          "productCategory": "SUBSCRIPTION",
          "subscriptionPeriod": "P1M",
          "pricePerWeekString": "£2.29",
          "pricePerYear": 119.88,
          "description": "",
          "pricePerYearString": "£119.88",
          "pricePerMonthString": "£9.99",
          "title": ""
        },
        "offeringIdentifier": "Digital Garage Premium"
      },
      {
        "presentedOfferingContext": {
          "placementIdentifier": null,
          "offeringIdentifier": "Digital Garage Premium",
          "targetingContext": null
        },
        "identifier": "Annual Standard",
        "offeringIdentifier": "Digital Garage Premium",
        "packageType": "CUSTOM",
        "product": {
          "description": "",
          "pricePerYearString": "£49.99",
          "identifier": "rc_dg_annual_standard_49.99",
          "pricePerMonth": 4.16,
          "priceString": "£49.99",
          "pricePerWeek": 0.95,
          "currencyCode": "GBP",
          "introPrice": null,
          "subscriptionPeriod": "P1Y",
          "pricePerWeekString": "£0.95",
          "pricePerYear": 49.989999999999995,
          "title": "",
          "pricePerMonthString": "£4.16",
          "discounts": [],
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
          "price": 49.989999999999995,
          "productCategory": "SUBSCRIPTION"
        }
      },
      {
        "product": {
          "pricePerYear": 69.99,
          "pricePerYearString": "£69.99",
          "description": "",
          "pricePerMonthString": "£5.83",
          "title": "",
          "identifier": "rc_dg_annual_premium_69.99",
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION",
          "discounts": [],
          "subscriptionPeriod": "P1Y",
          "pricePerWeekString": "£1.34",
          "introPrice": null,
          "currencyCode": "GBP",
          "pricePerWeek": 1.34,
          "productCategory": "SUBSCRIPTION",
          "price": 69.99,
          "priceString": "£69.99",
          "pricePerMonth": 5.83
        },
        "presentedOfferingContext": {
          "placementIdentifier": null,
          "targetingContext": null,
          "offeringIdentifier": "Digital Garage Premium"
        },
        "identifier": "Annual Premium",
        "packageType": "CUSTOM",
        "offeringIdentifier": "Digital Garage Premium"
      },
      {
        "offeringIdentifier": "Digital Garage Premium",
        "packageType": "CUSTOM",
        "product": {
          "discounts": [],
          "pricePerYear": 99.99,
          "productCategory": "SUBSCRIPTION",
          "priceString": "£99.99",
          "pricePerMonth": 8.33,
          "pricePerMonthString": "£8.33",
          "title": "",
          "price": 99.99,
          "pricePerWeekString": "£1.91",
          "subscriptionPeriod": "P1Y",
          "currencyCode": "GBP",
          "introPrice": null,
          "pricePerWeek": 1.9100000000000001,
          "identifier": "rc_dg_annual_premium_plus_99.99",
          "pricePerYearString": "£99.99",
          "description": "",
          "productType": "AUTO_RENEWABLE_SUBSCRIPTION"
        },
        "presentedOfferingContext": {
          "placementIdentifier": null,
          "targetingContext": null,
          "offeringIdentifier": "Digital Garage Premium"
        },
        "identifier": "Annual Premium Plus"
      }
    ],
    "identifier": "Digital Garage Premium",
    "metadata": {
      "backgroundColor": "#BE0E8DDE"
    },
    "serverDescription": "1st premium set of packages"
  }
}
```
