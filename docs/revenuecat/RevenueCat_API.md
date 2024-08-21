# RevenueCat API

## Setters
static setAllowSharingStoreAccount(allowSharing: boolean): Promise<void>;
static setSimulatesAskToBuyInSandbox(simulatesAskToBuyInSandbox: boolean): 
static setDebugLogsEnabled(enabled: boolean): Promise<void>;
static setLogLevel(level: LOG_LEVEL): Promise<void>;
static setLogHandler(logHandler: LogHandler): void;
static setAttributes(attributes: {
static setEmail(email: string | null): Promise<void>;
static setPhoneNumber(phoneNumber: string | null): Promise<void>;
static setDisplayName(displayName: string | null): Promise<void>;
static setPushToken(pushToken: string | null): Promise<void>;
static setProxyURL(url: string): Promise<void>;
static setAdjustID(adjustID: string | null): Promise<void>;
static setAppsflyerID(appsflyerID: string | null): Promise<void>;
static setFBAnonymousID(fbAnonymousID: string | null): Promise<void>;
static setMparticleID(mparticleID: string | null): Promise<void>;
static setCleverTapID(cleverTapID: string | null): Promise<void>;
static setMixpanelDistinctID(mixpanelDistinctID: string | null): Promise<void>;
static setFirebaseAppInstanceID(firebaseAppInstanceID: string | null): Promise<void>;
static setOnesignalID(onesignalID: string | null): Promise<void>;
static setAirshipChannelID(airshipChannelID: string | null): Promise<void>;
static setMediaSource(mediaSource: string | null): Promise<void>;
static setCampaign(campaign: string | null): Promise<void>;
static setAdGroup(adGroup: string | null): Promise<void>;
static setAd(ad: string | null): Promise<void>;
static setKeyword(keyword: string | null): Promise<void>;
static setCreative(creative: string | null): Promise<void>;

## Getters
static getOfferings(): Promise<PurchasesOfferings>;
static getCurrentOfferingForPlacement(placementIdentifier: string): Promise<PurchasesOffering | null>;
static getProducts(productIdentifiers: string[], type?: PURCHASE_TYPE | PRODUCT_CATEGORY): Promise<PurchasesStoreProduct[]>;
static getAppUserID(): Promise<string>;
static getCustomerInfo(): Promise<CustomerInfo>;
static getPromotionalOffer(product: PurchasesStoreProduct, discount: PurchasesStoreProductDiscount): Promise<PurchasesPromotionalOffer | undefined>;