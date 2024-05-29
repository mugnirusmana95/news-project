import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle"
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle"
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle"
import { FaTimes } from "@react-icons/all-files/fa/FaTimes"
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle"
import Button from "components/button"

interface Types {
  show?: boolean
  type?: "success" | "warning" | "info" | "danger" | "question"
  title?: string
  message?: string
  cancelLabel?: string
  onCancel?: () => void
  showConfirm?: boolean
  confirmLabel?: string
  onConfirm?: () => void
}

const Alert = ({
  show,
  type,
  title,
  message,
  cancelLabel,
  showConfirm,
  confirmLabel,
  onCancel,
  onConfirm
}: Types) => {
  const renderType = () => {
    switch(type) {
      case "info":
        return <div className="bg-sky-500 shadow-cst rounded absolute -top-5 left-5 w-[60px] h-[60px] text-white flex items-center justify-center text-2xl"><FaInfoCircle /></div>
      case "success":
        return <div className="bg-teal-500 shadow-cst rounded absolute -top-5 left-5 w-[60px] h-[60px] text-white flex items-center justify-center text-2xl"><FaCheckCircle /></div>
      case "warning":
        return <div className="bg-amber-500 shadow-cst rounded absolute -top-5 left-5 w-[60px] h-[60px] text-white flex items-center justify-center text-2xl"><FaExclamationCircle /></div>
      case "question":
        return <div className="bg-indigo-500 shadow-cst rounded absolute -top-5 left-5 w-[60px] h-[60px] text-white flex items-center justify-center text-2xl"><FaQuestionCircle /></div>
      case "danger":
        return <div className="bg-rose-500 shadow-cst rounded absolute -top-5 left-5 w-[60px] h-[60px] text-white flex items-center justify-center text-2xl"><FaTimes /></div>
      default:
        return <div className="bg-sky-500 shadow-cst rounded absolute -top-5 left-5 w-[60px] h-[60px] text-white flex items-center justify-center text-2xl"><FaInfoCircle /></div>
    }
  }

  return (
    <div className={`w-screen h-screen fixed duration-300 ${show ? 'top-0' : 'top-[3000px]'} flex items-center justify-center backdrop-blur-md`}>
      <div className="w-1/3 h-fit p-5 rounded bg-white shadow-cst flex flex-col gap-5 relative border border-gray-100">
        {renderType()}
        <span className="pl-20 font-bold text-justify">{title}</span>
        <span className="text-justify text-xs">{message}</span>
        <div className="w-full flex flex-row gap-5">
          <Button
            isFull
            label={cancelLabel??"close"}
            type="reset"
            onClick={() => onCancel ? onCancel() : {}}
          />
          {showConfirm ? <Button
            isFull
            label={confirmLabel??"confirm"}
            type="submit"
            onClick={() => onConfirm ? onConfirm() : {}}
          /> : null}
        </div>
      </div>
    </div>
  )
}

export default Alert