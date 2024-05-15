export const setErrorAxios = (error: any) => {
  return {
    message: error?.data?.meta?.message??'Oops something went wrong',
    errorMeta: error?.data?.data??{}
  }
}

export const setSuccessAxios = (response: any) => {
  return response?.data?.data
}