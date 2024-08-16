# RevenueCat Revenue Flow

## How RevenueCat App Revenue is Populated in App Store Connect
RevenueCat manages the subscription and in-app purchase flows for your app, but it does not handle the actual revenue transfers. Instead, the revenue generated through subscriptions or in-app purchases is processed by the Apple App Store. The earnings from these transactions are then reported in the App Store Connect portal under the **Payments and Financial Reports** section. RevenueCat can help by importing products and prices from App Store Connect using an API key, but the financial data is ultimately populated in App Store Connect by Apple’s systems.

## How to See Your Financial Reports for a Specific App
To view the financial reports for a specific app:

1. **Sign in to App Store Connect**: Access [App Store Connect](https://appstoreconnect.apple.com) with your Apple Developer credentials.
2. **Navigate to Payments and Financial Reports**: From the homepage, click on **Payments and Financial Reports**.
3. **Generate and Download Reports**: You can create financial reports by selecting the fiscal month you are interested in. These reports will include detailed information about your app’s earnings, broken down by country, currency, and transaction type. Reports are typically available by the first Friday of each new fiscal month, covering the previous month’s earnings.

## How to Withdraw Your Money to a Bank in the UK
Once your revenue is reported in App Store Connect:

1. **Ensure Your Bank Account is Linked**: Make sure your UK bank account is linked to your Apple Developer account. This is set up in the **Agreements, Tax, and Banking** section of App Store Connect.
2. **Payment Processing**: Apple processes payments typically 33 days after the end of the fiscal month in which the revenue was earned. These payments are then automatically transferred to your linked bank account.
3. **Monitor Transfer**: You can monitor the status of these transfers in the Payments and Financial Reports section, where Apple will provide details on the amount being transferred and the scheduled date of the transfer.

For UK-based developers, payments will be made in GBP (British Pounds), and you will receive the funds in your linked bank account according to Apple’s payout schedule. 

## Summary
This setup ensures that your app revenue is efficiently managed and transferred from the Apple App Store to your bank account with the help of both RevenueCat and App Store Connect.
