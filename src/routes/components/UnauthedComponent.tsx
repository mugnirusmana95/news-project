import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router"

import UnauthedTemplate from "routes/template/UnauthedTemplate"
import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "redux/store"

interface Props {
  component: any
  token?: string | null
}

const UnauthedComponent = ({
  component: Component,
  token
}: Props) => {
  const router = useNavigate()
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  if (!token) {
    return (
      <UnauthedTemplate>
        <Component router={router} state={state} dispatch={dispatch} />
      </UnauthedTemplate>
    )
  }

  return <Navigate to={"/dashboard"} />
}

export default UnauthedComponent