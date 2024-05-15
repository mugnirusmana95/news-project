import { PageType } from "pages/PageType"
import { defaultSignIn, signIn } from "redux/slices/auth-slices"
import { useEffect } from "react"

const Login = ({ router, state, dispatch }: PageType) => {
  const { auth } = state

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      isUnauthorized
    } = auth

    if(!isLoading) {
      if(isError) {
        if(isUnauthorized) {
         console.log('Auto logout cause token issue or get response 401') 
         dispatch(defaultSignIn())
        } else {
          dispatch(defaultSignIn())          
        }
      }
      if(isSuccess) dispatch(defaultSignIn())
    }
  }, [auth])

  return (
    <div className="w-full h-full flex-flex-row font-bold flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">Login</div>
      <div className="w-full flex flex-row gap-5 items-center justify-center">
        <span
          className="w-fit underline italic cursor-pointer"
          onClick={() => router('/')}
        >Home</span>
        <span
          className="w-fit underline italic cursor-pointer"
          onClick={() => !auth?.isLoading ? dispatch(signIn({
            username: 'fake_username',
            password: 'fake_password',
            is_forever: false
          })) : {}}
        >{auth?.isLoading ? "Loading..." : "Sign In"}</span>
      </div>
    </div>
  )
}

export default Login