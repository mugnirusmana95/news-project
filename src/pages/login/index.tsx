import { useEffect, useState } from "react"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import { IoKey } from "@react-icons/all-files/io5/IoKey"
import { IoLogoFacebook } from "@react-icons/all-files/io5/IoLogoFacebook"
import { IoLogoGoogle } from "@react-icons/all-files/io5/IoLogoGoogle"
import { IoCall } from "@react-icons/all-files/io5/IoCall"

import Input, { dataInputType } from "components/input"
import Checkbox, { dataCheckboxType } from "components/checkbox"
import Alert from "components/alert"
import Button from "components/button"

import { PageType } from "pages/PageType"
import { defaultSignIn, signIn } from "redux/slices/auth-slices"

const Login = ({ router, state, dispatch }: PageType) => {
  const { auth } = state
  const [username, setUsername] = useState<dataInputType>()
  const [password, setPassword] = useState<dataInputType>()
  const [rememberMe, setRememberMe] = useState<dataCheckboxType>()
  const [errorAlert, setErrorAlert] = useState({
    show: false,
    title: '',
    message: ''
  })

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      isUnauthorized,
      errorMessage
    } = auth

    if(!isLoading) {
      if(isError) {
        if(isUnauthorized) {
         setErrorAlert({
          show: true,
          title: 'Authorization',
          message: errorMessage??''
         })
         dispatch(defaultSignIn())
        } else {
          setErrorAlert({
            show: true,
            title: 'Sign In',
            message: errorMessage??''
           })
          dispatch(defaultSignIn())
        }
      }
      if(isSuccess) dispatch(defaultSignIn())
    }
  }, [auth])

  return (
    <>
      <div className="w-full h-full flex items-center justify-center px-5 tablet:px-0">
        <div className="w-full tablet:w-1/2 laptop:w-1/3 h-fit px-5 tablet:px-10 pb-5 rounded bg-white shadow-cst pt-[90px] flex flex-col gap-5 relative">

          <div className="w-[70%] bg-cyan-500 min-h-[100px] absolute -top-10 left-[15%] rounded shadow-cst flex flex-col items-center justify-center text-white">
            <span className="font-bold text-2xl">Login</span>
            <span>Walcome to FlatAdmin</span>
          </div>

          <Input
            name="Username"
            label="Username"
            type="email"
            icon={<IoPerson />}
            value={username?.value}
            isError={username?.isError}
            message={username?.message}
            validate={{
              rules: {
                required: true
              }
            }}
            onChange={(data: dataInputType) => setUsername(data)}
            onClear={(data: dataInputType) => setUsername(data)}
          />

          <Input
            name="Password"
            label="Password"
            type="password"
            icon={<IoKey />}
            value={password?.value}
            isError={password?.isError}
            message={password?.message}
            validate={{
              rules: {
                required: true
              }
            }}
            onChange={(data: dataInputType) => setPassword(data)}
            onClear={(data: dataInputType) => setPassword(data)}
          />

          <Checkbox
            name="remember_me"
            label="Remember Me"
            isChecked={rememberMe?.isChecked}
            isError={rememberMe?.isError}
            message={rememberMe?.message}
            onCheck={(data: dataCheckboxType) => setRememberMe(data)}
          />

          <Button
            isFull
            disabled={!username?.value || username?.isError || !password?.value || password?.isError || auth?.isLoading}
            label={auth?.isLoading ? "loading..." : "sign in"}
            type="submit"
            onClick={() => dispatch(signIn({username: username?.value, password: password?.value}))}
          />

          <div className="w-full border-t border-t-gray-200 flex flex-col items-center pt-5 gap-2">
            <span>Or sign in with:</span>
            <div className="w-full flex flex-row gap-2 justify-center">
              <div className="w-[30px] h-[30px] rounded duration-300 flex items-center justify-center hover:text-white hover:bg-cyan-500 hover:shadow-sm-cst cursor-pointer text-blue-500"><IoLogoFacebook /></div>
              <div className="w-[30px] h-[30px] rounded duration-300 flex items-center justify-center hover:text-white hover:bg-cyan-500 hover:shadow-sm-cst cursor-pointer text-red-500"><IoLogoGoogle /></div>
              <div className="w-[30px] h-[30px] rounded duration-300 flex items-center justify-center hover:text-white hover:bg-cyan-500 hover:shadow-sm-cst cursor-pointer text-green-500"><IoCall /></div>
            </div>
          </div>

          <div className="w-full flex flex-col laptop:flex-row items-center justify-center text-xs border-t border-t-gray-200 pt-5 text-gray-300 gap-2">
            <span
              className="cursor-pointer text-center duration-300 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-sm-cst rounded p-2"
              onClick={() => router('/')}
            >Back to Home</span>
            <span className="hidden tablet:flex">|</span>
            <span
              className="cursor-pointer text-center duration-300 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-sm-cst rounded p-2"
              onClick={() => router('/forgot-password')}
            >Forgot password</span>
            <span className="hidden tablet:flex">|</span>
            <span
              className="cursor-pointer text-center duration-300 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-sm-cst rounded p-2"
              onClick={() => router('/reactivate-account')}
            >Reactivate account</span>
            <span className="hidden tablet:flex">|</span>
            <span
              className="cursor-pointer text-center duration-300 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-sm-cst rounded p-2"
              onClick={() => router('/register')}
            >Register</span>
          </div>

        </div>
      </div>

      <Alert
        show={errorAlert.show}
        type="warning"
        title={errorAlert.title}
        message={errorAlert.message}
        onCancel={() => {
          setErrorAlert({
            ...errorAlert,
            show: false,
           })
        }}
      />
    </>
  )
}

export default Login