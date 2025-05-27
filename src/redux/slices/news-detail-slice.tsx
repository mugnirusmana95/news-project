import { Dispatch, createSlice } from "@reduxjs/toolkit"

interface SliceType {
  id?: string | null
}

const initialState: SliceType = {
  id: null,
}

const slice = createSlice({
  name: "newsDetail",
  initialState,
  reducers: {
    reducerNewsDetail: (state: SliceType, payload) => {
      state.id = payload.payload
    }
  }
})

export const {
  reducerNewsDetail,
} = slice.actions

export const setNewsDetail = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerNewsDetail(id))
  }
}

export default slice.reducer