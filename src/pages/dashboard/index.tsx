import { PageType } from "pages/PageType"
import { useEffect } from "react"
import { defaultSignIn, logOut } from "redux/slices/auth-slices"

const Dashboard = ({ router, state, dispatch }: PageType) => {
  const { auth } = state

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError
    } = auth

    if(!isLoading) {
      if(isError) dispatch(defaultSignIn())
      if(isSuccess) dispatch(defaultSignIn())
    }
  }, [auth])

  return (
    <div className="w-full h-full flex-flex-row font-bold flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">Dashboard (Welcome {auth?.data?.name})</div>
      <div className="w-full flex flex-row gap-5 items-center justify-center">
        <span
          className="w-fit underline italic cursor-pointer"
          onClick={() => router('/')}
        >Home</span>
        <span
          className="w-fit underline italic cursor-pointer"
          onClick={() => !auth?.isLoading ? dispatch(logOut()) : {}}
        >{auth?.isLoading ? "Loading..." : "Sign Out"}</span>
      </div>
    </div>
  )
}

export default Dashboard