import { IoPerson } from "@react-icons/all-files/io5/IoPerson"
import { NavigateFunction } from "pages/PageType"

interface Types {
  router: NavigateFunction
  currentRouter?: string | null
}

const Header = ({
  router,
  currentRouter
}: Types) => {
  return (
    <div className="w-full flex flex-row">
      <div className="w-full min-h-[30px] flex flex-row items-center gap-5 text-gray-800">
        <span className="text-cyan-500 font-bold">News App</span>
        <span>|</span>
        <span className={`${currentRouter === '/' ? 'text-cyan-500 font-bold' : 'cursor-pointer'}`} onClick={() => router('/')}>Home</span>
        <span className={`${currentRouter === '/all-news' ? 'text-cyan-500 font-bold' : 'cursor-pointer'}`} onClick={() => router('/all-news')}>All News</span>
        <span className={`${currentRouter === '/algorithm' ? 'text-cyan-500 font-bold' : 'cursor-pointer'}`} onClick={() => router('/algorithm')}>Algorithm</span>
      </div>
      <div className="w-fit flex flex-row items-center gap-5">
        <div className="w-[30px] h-[30px] rounded-full border-2 border-gray-600 items-center justify-center flex">
          <IoPerson />
        </div>
      </div>
    </div>
  )
}

export default Header