import { combineReducers } from "@reduxjs/toolkit"
import auth from "redux/slices/auth-slices"

const rootReducer = combineReducers({
  auth
})

export default rootReducer