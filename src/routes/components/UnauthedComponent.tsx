import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router"

import UnauthedTemplate from "routes/template/UnauthedTemplate"

interface Props {
  component: any
  token?: string | null
}

const UnauthedComponent = ({
  component: Component,
  token
}: Props) => {
  const router = useNavigate()

  if (!token) {
    return (
      <UnauthedTemplate>
        <Component router={router} />
      </UnauthedTemplate>
    )
  }

  return <Navigate to={"/dashboard"} />
}

export default UnauthedComponent