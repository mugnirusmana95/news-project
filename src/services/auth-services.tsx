import axios from "axios"
import ENV from "config/base-env"
import { ParamsSignInType } from "redux/slices/auth-slices"

export const login = (params: ParamsSignInType) => {
  return axios.post(`${ENV.API}/login`, params, {
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface registerType {
  name?: string
  username?: string
  email?: string
  password?: string
}

export const register = (params: registerType) => {
  return axios.post(`${ENV.API}/register`, params, {
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
}