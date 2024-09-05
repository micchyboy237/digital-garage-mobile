/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export const API_HOST = "https://brief-leading-polliwog.ngrok-free.app"

export default {
  API_HOST,
  API_URL: "https://api.rss2json.com/v1/",
  API_TRPC_URL: `${API_HOST}/trpc`,
}
