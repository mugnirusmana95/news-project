export interface dataCheckboxType {
  name?: string
  isChecked?: boolean
  isError?: boolean
  message?: string
}

interface Types extends dataCheckboxType {
  label?: string
  info?: {
    type: "split" | "replace"
    message: string
  }
  validate?: {
    rules: {
      required?: boolean
    },
    customMessage?: {
      required?: string
    }
  }
  onCheck?: (data: dataCheckboxType) => void
}

const Checkbox = ({
  name,
  isChecked,
  isError,
  message,
  label,
  info,
  validate,
  onCheck
}: Types) => {
  return (
    <div className="w-fit flex flex-col cursor-pointer">
      <div
        className="w-fit flex flex-row items-center gap-2"
        onClick={() => {
          let fieldName = 'This field'
          let result: dataCheckboxType = {
            isChecked: !isChecked,
            isError: false,
            message: ''
          }
          if (name) result.name = name
          if (label) fieldName = label

          if (validate?.rules?.required && (!isChecked) === false) {
            result.isError = true
            result.message = validate?.customMessage?.required ?? `${fieldName} is required`
          }

          if (onCheck) {
            onCheck(result)
          }
        }}
      >
        <div className={`w-[15px] h-[15px] rounded duration-300 border ${isError ? 'border-rose-500' : 'border-gray-200'} flex items-center justify-center`}>
          <div className={`w-[10px] h-[10px] duration-300 bg-cyan-500 ${isChecked ? 'opacity-100' : 'opacity-0'} rounded-sm`}></div>
        </div>
        <span className={`duration-300 ${isError ? 'text-rose-500' : ''}`}>{label??'Label'}</span>
      </div>
      {info?.type === 'split' ? <span className="text-[10px]">{info?.message??''}</span> : null}
      <span className={`${isError ? 'text-rose-500' : ''} text-[10px]`}>{message ? message : info?.type === 'replace' ? info?.message : ''}</span>
    </div>
  )
}

export default Checkbox