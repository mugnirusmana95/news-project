import { ReactNode } from "react"

interface TemplateType {
  children: ReactNode
}

const AuthedTemplate = ({ children }: TemplateType) => {
  return (
    <div className="w-screen h-screen text-xs bg-red-500">{children}</div>
  )
}

export default AuthedTemplate