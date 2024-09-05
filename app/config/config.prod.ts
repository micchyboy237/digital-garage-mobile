/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export const API_HOST = "https://brief-leading-polliwog.ngrok-free.app"

export default {
  API_HOST,
  API_URL: "CHANGEME",
  API_TRPC_URL: `${API_HOST}/trpc`,
}
