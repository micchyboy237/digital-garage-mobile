export const ErrorMessages = {
  INTERNAL_SERVER_ERROR: "An unexpected error occurred",
  USER_ALREADY_EXISTS: "User with this email already exists",
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_EMAIL_ADDRESS: "Invalid email address",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters long",
  UNAUTHORIZED: "Please authenticate",
  EMAIL_NOT_VERIFIED: "Email not verified",
  EMAIL_ALREADY_VERIFIED: "Email already verified",
  USER_CREATION_FAILED: "Failed to create user",
  USER_NOT_FOUND: "User not found",
  INVALID_GOOGLE_ID_TOKEN: "Invalid Google ID token",
  INVALID_OR_EXPIRED_VERIFICATION_CODE: "Invalid or expired verification code",
  INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN: "Invalid or expired password reset token",
} as const // This ensures that the object is treated as literal types

export const ErrorCodes = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_EMAIL_ADDRESS: "INVALID_EMAIL_ADDRESS",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",
  UNAUTHORIZED: "UNAUTHORIZED",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  EMAIL_ALREADY_VERIFIED: "EMAIL_ALREADY_VERIFIED",
  USER_CREATION_FAILED: "USER_CREATION_FAILED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_GOOGLE_ID_TOKEN: "INVALID_GOOGLE_ID_TOKEN",
  INVALID_OR_EXPIRED_VERIFICATION_CODE: "INVALID_OR_EXPIRED_VERIFICATION_CODE",
  INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN: "INVALID_OR_EXPIRED_PASSWORD_RESET_TOKEN",
} as const // This ensures that the object is treated as literal types

// Derive types from ErrorMessages and ErrorCodes
export type ErrorCode = keyof typeof ErrorMessages
export type ErrorMessage = (typeof ErrorMessages)[ErrorCode]
