import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router"

import AuthedTemplate from "routes/template/AuthedTemplate"

interface Props {
  component: any
  token?: string | null
}

const AuthedComponent = ({
  component: Component,
  token
}: Props) => {
  const router = useNavigate()

  if (token) {
    return (
      <AuthedTemplate>
        <Component router={router} />
      </AuthedTemplate>
    )
  }

  return <Navigate to={"/login"} />
}

export default AuthedComponent