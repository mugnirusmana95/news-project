import PublicTemplate from "routes/template/PublicTemplate"
import { useNavigate } from "react-router"

interface Props {
  component: any
}

const PublicComponent = ({ component: Component }: Props) => {
  const router = useNavigate()

  return (
    <PublicTemplate>
      <Component router={router} />
    </PublicTemplate>
  )
}

export default PublicComponent