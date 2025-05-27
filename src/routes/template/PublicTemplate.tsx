import { ReactNode } from "react"

interface TemplateType {
  children: ReactNode
}

const PublicTemplate = ({ children }: TemplateType) => {
  return (
    <div className="w-fit h-fit text-xs">
      {children}
    </div>
  )
}

export default PublicTemplate