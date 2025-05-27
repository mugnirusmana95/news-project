import { combineReducers } from "@reduxjs/toolkit"
import auth from "redux/slices/auth-slices"
import news from "redux/slices/news-slices"
import newsDetail from "redux/slices/news-detail-slice"

const rootReducer = combineReducers({
  auth,
  news,
  newsDetail
})

export default rootReducer