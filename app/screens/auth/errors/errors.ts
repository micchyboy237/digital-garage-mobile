export const LoginErrorCodes = {
  INVALID_EMAIL: "auth/invalid-email",
  USER_DISABLED: "auth/user-disabled",
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  ACCOUNT_EXISTS: "auth/account-exists-with-different-credential",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
  INVALID_VERIFICATION_CODE: "auth/invalid-verification-code",
  INVALID_VERIFICATION_ID: "auth/invalid-verification-id",
  EMAIL_NOT_VERIFIED: "custom/email-not-verified",
} as const

export const LoginErrorMessages = {
  [LoginErrorCodes.INVALID_EMAIL]: "The email address you entered is invalid.",
  [LoginErrorCodes.USER_DISABLED]:
    "Your account has been disabled. Please contact support for assistance.",
  [LoginErrorCodes.USER_NOT_FOUND]: "We couldn't find a user with that email address.",
  [LoginErrorCodes.WRONG_PASSWORD]: "The password you entered is incorrect.",
  [LoginErrorCodes.ACCOUNT_EXISTS]:
    "An account with this email already exists. Please try logging in or reset your password.",
  [LoginErrorCodes.INVALID_CREDENTIAL]: "Account does not exist.",
  [LoginErrorCodes.OPERATION_NOT_ALLOWED]: "This operation is not allowed. Please try again later.",
  [LoginErrorCodes.INVALID_VERIFICATION_CODE]: "The verification code you entered is invalid.",
  [LoginErrorCodes.INVALID_VERIFICATION_ID]: "The verification ID you entered is invalid.",
  [LoginErrorCodes.EMAIL_NOT_VERIFIED]: "Your email is not verified.",
} as const

export const SignupErrorCodes = {
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  INVALID_EMAIL: "auth/invalid-email",
  OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
  WEAK_PASSWORD: "auth/weak-password",
} as const

export const SignupErrorMessages = {
  [SignupErrorCodes.EMAIL_ALREADY_IN_USE]: "An account with this email already exists.",
  [SignupErrorCodes.INVALID_EMAIL]: "The email address you entered is invalid.",
  [SignupErrorCodes.OPERATION_NOT_ALLOWED]:
    "Sorry, we are currently unable to process your request. Please try again later.",
  [SignupErrorCodes.WEAK_PASSWORD]:
    "The password you entered is not strong enough. Please choose a stronger password.",
} as const

export type LoginErrorCode = keyof typeof LoginErrorMessages
export type LoginErrorMessage = (typeof LoginErrorMessages)[LoginErrorCode]

export type SignupErrorCode = keyof typeof SignupErrorMessages
export type SignupErrorMessage = (typeof SignupErrorMessages)[SignupErrorCode]
