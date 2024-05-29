import { Dispatch, createSlice } from "@reduxjs/toolkit"
import { setErrorAxios, setSuccessAxios } from "config/helpers"

export interface ParamsSignInType {
  username?: string
  password?: string
  is_forever?: boolean
}

interface SliceType {
  data?: {
    [key: string]: any
  }
  isLoading?: boolean
  isError?: boolean
  isSuccess?: boolean
  errorMessage?: string | null,
  errorMeta?: any,
  isUnauthorized?: boolean
}

const initialState: SliceType = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {},
  isUnauthorized: false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reducerRemoveToken: (state: SliceType) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = {}
      state.errorMeta = {}
    },
    reducerLoginDefault: (state: SliceType) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isUnauthorized = false
    },
    reducerLogin: (state: SliceType) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerLoginSuccess: (state: SliceType, payload) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload?.payload
    },
    reducerLoginFailed: (state: SliceType, payload) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.payload?.message
      state.errorMeta = payload?.payload?.errorMeta
    },
    reducerUnauthorized: (state: SliceType, payload) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.isUnauthorized = true
      state.data = {}
      state.errorMessage = payload?.payload
    }
  }
})

const {
  reducerRemoveToken,
  reducerLoginDefault,
  reducerLogin,
  reducerLoginSuccess,
  reducerLoginFailed,
  reducerUnauthorized
} = slice.actions

export const signIn = (params: ParamsSignInType) => {

  return async (dispatch: Dispatch) => {
    dispatch(reducerLogin())
    let failed = false
    if (params?.username !== "admin" && params?.password !== "admin") failed = true
    const timeOut = setTimeout(() => {
      if (!failed) {
        let response = {
          data: {
            data: {
              access_token: 'fake_token',
              name: "Fake Name"
            }
          }
        }
        localStorage.setItem('token', response?.data?.data?.access_token)
        clearTimeout(timeOut)
        dispatch(reducerLoginSuccess(setSuccessAxios(response)))
      } else {
        let error = {
          response: {
            data: {
              meta: {
                message: 'User or password is does not match'
              },
              data: null
            }
          }
        }
        clearTimeout(timeOut)
        dispatch(reducerLoginFailed(setErrorAxios(error)))
      }
    }, 1500)
  }
}

export const defaultSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerLoginDefault())
  }
}

export const logOut = () => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerLogin())
    setTimeout(() => {
      localStorage.removeItem('token')
      dispatch(reducerRemoveToken())
    }, 1500)
  }
}

export const logoutTokenInvalid = (data: any) => {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem('token')
    dispatch(reducerUnauthorized(data))
  }
}

export default slice.reducer