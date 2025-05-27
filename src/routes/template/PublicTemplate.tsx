import { ReactNode } from "react"

interface TemplateType {
  children: ReactNode
}

const PublicTemplate = ({ children }: TemplateType) => {
  return (
    <div className="w-screen h-screen text-xs">
      {children}
    </div>
  )
}

export default PublicTemplate