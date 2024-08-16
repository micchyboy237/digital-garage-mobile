// AppleAuthentication.ts
import {
  AppleAuthenticationCredential,
  AppleAuthenticationCredentialState,
  AppleAuthenticationOperation,
  AppleAuthenticationRefreshOptions,
  AppleAuthenticationScope,
  AppleAuthenticationSignInOptions,
  AppleAuthenticationSignOutOptions,
} from "expo-apple-authentication/build/AppleAuthentication.types"
import ExpoAppleAuthentication from "expo-apple-authentication/build/ExpoAppleAuthentication"
import { CodedError, EventEmitter, Subscription, UnavailabilityError } from "expo-modules-core"

class AppleAuthentication {
  private static eventEmitter = new EventEmitter(ExpoAppleAuthentication)

  static async isAvailableAsync(): Promise<boolean> {
    if (!ExpoAppleAuthentication || !ExpoAppleAuthentication.isAvailableAsync) {
      return false
    }
    return ExpoAppleAuthentication.isAvailableAsync()
  }

  static async signInAsync(
    options?: AppleAuthenticationSignInOptions,
  ): Promise<AppleAuthenticationCredential> {
    if (!ExpoAppleAuthentication || !ExpoAppleAuthentication.requestAsync) {
      throw new UnavailabilityError("expo-apple-authentication", "signInAsync")
    }
    const requestOptions = {
      ...options,
      requestedOperation: AppleAuthenticationOperation.LOGIN,
    }
    const credential = await ExpoAppleAuthentication.requestAsync(requestOptions)
    if (!credential.authorizationCode || !credential.identityToken || !credential.user) {
      throw new CodedError(
        "ERR_REQUEST_FAILED",
        "The credential returned by `signInAsync` is missing one or more required fields.",
      )
    }
    return credential
  }

  static async refreshAsync(
    options: AppleAuthenticationRefreshOptions,
  ): Promise<AppleAuthenticationCredential> {
    if (!ExpoAppleAuthentication || !ExpoAppleAuthentication.requestAsync) {
      throw new UnavailabilityError("expo-apple-authentication", "refreshAsync")
    }
    const requestOptions = {
      ...options,
      requestedOperation: AppleAuthenticationOperation.REFRESH,
    }
    const credential = await ExpoAppleAuthentication.requestAsync(requestOptions)
    if (!credential.authorizationCode || !credential.identityToken || !credential.user) {
      throw new CodedError(
        "ERR_REQUEST_FAILED",
        "The credential returned by `refreshAsync` is missing one or more required fields.",
      )
    }
    return credential
  }

  static async signOutAsync(
    options: AppleAuthenticationSignOutOptions,
  ): Promise<AppleAuthenticationCredential> {
    if (!ExpoAppleAuthentication || !ExpoAppleAuthentication.requestAsync) {
      throw new UnavailabilityError("expo-apple-authentication", "signOutAsync")
    }
    const requestOptions = {
      ...options,
      requestedOperation: AppleAuthenticationOperation.LOGOUT,
    }
    return ExpoAppleAuthentication.requestAsync(requestOptions)
  }

  static async getCredentialStateAsync(user: string): Promise<AppleAuthenticationCredentialState> {
    if (!ExpoAppleAuthentication || !ExpoAppleAuthentication.getCredentialStateAsync) {
      throw new UnavailabilityError("expo-apple-authentication", "getCredentialStateAsync")
    }
    return ExpoAppleAuthentication.getCredentialStateAsync(user)
  }

  static addRevokeListener(listener: () => void): Subscription {
    return this.eventEmitter.addListener("Expo.appleIdCredentialRevoked", listener)
  }
}

// Export the class and types explicitly
export {
  AppleAuthentication,
  AppleAuthenticationCredential,
  AppleAuthenticationCredentialState,
  AppleAuthenticationOperation,
  AppleAuthenticationRefreshOptions,
  AppleAuthenticationScope,
  AppleAuthenticationSignInOptions,
  AppleAuthenticationSignOutOptions, // This is exported so it can be used directly
  CodedError,
}
