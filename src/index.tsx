import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import store from "redux/store"
import axios from 'axios'
import { logoutTokenInvalid } from 'redux/slices/auth-slices'

let persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

const UNAUTHORIZED = 401
const { dispatch } = store
axios.interceptors.response.use(
  response => response,
  (error) => {
    const {status, data} = error.response
    if (status === UNAUTHORIZED) dispatch(logoutTokenInvalid(data?.meta?.message))
    return Promise.reject(error)
  }
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
