import { FaSpinner } from "@react-icons/all-files/fa/FaSpinner"

interface Types {
  show?: boolean
}

const Loader = ({ show }: Types) => {
  return (
    <div className={`w-screen h-screen fixed duration-300 top-0 ${show ? 'left-0' : 'left-[-3000px]'} flex items-center justify-center backdrop-blur-md gap-1`}>
      <FaSpinner className="animate-spin text-cyan-500 font-bold text-2xl"/>
      <span className="font-bold text-cyan-500 text-2xl">Loading...</span>
    </div>
  )
}

export default Loader