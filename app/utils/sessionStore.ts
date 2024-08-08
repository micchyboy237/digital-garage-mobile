import * as storage from "./storage"

const key = "session_token"
export const getToken = () => storage.load(key)
export const deleteToken = () => storage.remove(key)
export const setToken = (v: string) => storage.save(key, v)
