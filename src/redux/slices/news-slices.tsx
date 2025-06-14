import { Dispatch, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { slugify } from "config/helpers"
import { RootState } from "redux/store"

export interface newsSliceType {
  page?: number
  pageSize?: number
  category?: string
  isCombine?: boolean
}

export interface dataArticlesType {
  id?: string
  source?: {
    id: string | null,
    name: string | null
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

interface SliceType {
  page?: number
  data?: Array<dataArticlesType>
  isLoading?: boolean
  isError?: boolean
  isSuccess?: boolean
  errorMessage?: string | null,
}

const initialState: SliceType = {
  page: 1,
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
}

const slice = createSlice({
  name: "news",
  initialState,
  reducers: {
    reducerNewsDefault: (state: SliceType) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerNews: (state: SliceType) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    reducerNewsSuccess: (state: SliceType, payload) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.data = payload?.payload?.data
      state.page = payload?.payload?.page
    },
    reducerNewsFailed: (state: SliceType, payload) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.payload
    },
  }
})

export const {
  reducerNewsDefault,
  reducerNews,
  reducerNewsSuccess,
  reducerNewsFailed,
} = slice.actions

export const getNews = (params: newsSliceType) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    dispatch(reducerNews())
    try {
      const response = await axios.get(`api/proxy/everything?page=${params.page}&pageSize=${params.pageSize}&q=${params.category}`)
      let data = state.news.data
      let newsData: Array<dataArticlesType> = []
      let newArticles: Array<dataArticlesType> = response?.data?.articles?.map((item: dataArticlesType) => {
        item.id = slugify(item.title)
        return item
      })
      if (params.isCombine) {
        if (data && data?.length > 0) {
          newsData = [...data, ...newArticles]
        } else {
          newsData = newArticles
        }
      } else {
        newsData = newArticles
      }
      dispatch(reducerNewsSuccess({
        data: newsData,
        page: params.page
      }))
    } catch (error: any) {
      dispatch(reducerNewsFailed(error?.response?.data?.message ?? error?.message))
    }
  }
}

export const defaultNews = () => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerNewsDefault())
  }
}

export default slice.reducer