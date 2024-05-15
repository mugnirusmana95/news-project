import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist"
import rootReducer from "redux/root-reducers"
import ENV from "config/base-env"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  devTools: ENV.MODE ? ENV.MODE.toLowerCase() !== "production" : true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type RootDispatch = typeof store.dispatch

export default store
