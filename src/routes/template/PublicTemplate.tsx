import { ReactNode } from "react"

interface TemplateType {
  children: ReactNode
}

const PublicTemplate = ({ children }: TemplateType) => {
  return (
    <div className="w-screen h-screen text-xs">
      {children}
      <div className="w-full min-h-[50px]"></div>
    </div>
  )
}

export default PublicTemplate