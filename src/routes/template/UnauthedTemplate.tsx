import { ReactNode } from "react"
import {
  BgLandscape
} from 'assets/images'

interface TemplateType {
  children: ReactNode
}

const UnauthedTemplate = ({ children }: TemplateType) => {
  return (
    <div className="w-screen h-screen text-sm relative text-gray-700 bg-gray-300 flex flex-col">
      <div className="absolute top-0 left-0">
        <img src={BgLandscape} className="w-screen h-screen object-cover" alt="bg"/>
      </div>
      <div className="w-screen min-h-screen h-screen bg-black opacity-20 absolute top-0 left-0"></div>
      <div className="w-screen min-h-screen h-screen absolute top-0 left-0 backdrop-blur-md"></div>
      <div className="w-full h-full">{children}</div>
    </div>
  )
}

export default UnauthedTemplate