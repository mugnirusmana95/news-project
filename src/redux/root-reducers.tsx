import { combineReducers } from "@reduxjs/toolkit"
import auth from "redux/slices/auth-slices"
import news from "redux/slices/news-slices"

const rootReducer = combineReducers({
  auth,
  news
})

export default rootReducer