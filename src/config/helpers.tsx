export const setErrorAxios = (error: any) => {
  return {
    message: error?.response?.data?.meta?.message??'Oops something went wrong',
    errorMeta: error?.response?.data?.data??{}
  }
}

export const setSuccessAxios = (response: any) => {
  return response?.data?.data
}