import { ReactNode } from "react"

interface TemplateType {
  children: ReactNode
}

const UnauthedTemplate = ({ children }: TemplateType) => {
  return (
    <div className="w-screen h-screen text-xs bg-green-500">{children}</div>
  )
}

export default UnauthedTemplate