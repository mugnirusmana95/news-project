import PublicTemplate from "routes/template/PublicTemplate"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "redux/store"

interface Props {
  component: any
}

const PublicComponent = ({ component: Component }: Props) => {
  const router = useNavigate()
  const state = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  return (
    <PublicTemplate>
      <Component router={router} state={state} dispatch={dispatch} />
    </PublicTemplate>
  )
}

export default PublicComponent