import {
  LoginErrorCode,
  LoginErrorMessages,
  SignupErrorCode,
  SignupErrorMessages,
} from "app/screens/auth/errors/errors"

export class AuthError extends Error {
  code: string

  constructor(code: LoginErrorCode | SignupErrorCode) {
    const defaultError = "Unknown Auth Error"
    const message =
      LoginErrorMessages[code as LoginErrorCode] ||
      SignupErrorMessages[code as SignupErrorCode] ||
      defaultError
    super(message)
    this.code = code
    this.name = "AuthError"
  }
}
