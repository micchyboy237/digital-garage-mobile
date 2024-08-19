import {
  LoginErrorCode,
  LoginErrorMessages,
  SignupErrorCode,
  SignupErrorMessages,
} from "app/screens/auth/errors/errors"

export class AuthError extends Error {
  code: string

  constructor(error: AuthError) {
    const defaultError = error.message ? error.message.slice(0, 100) : "Unknown Auth Error"
    const message =
      LoginErrorMessages[error.code as LoginErrorCode] ||
      SignupErrorMessages[error.code as SignupErrorCode] ||
      defaultError
    super(message)
    this.code = error.code
    this.name = "AuthError"
  }
}
