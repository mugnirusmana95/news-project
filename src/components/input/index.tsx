import { useState } from "react"
import { IoEye } from "@react-icons/all-files/io5/IoEye"
import { IoEyeOff } from "@react-icons/all-files/io5/IoEyeOff"
import { IoIosCloseCircle } from "@react-icons/all-files/io/IoIosCloseCircle"
import { isNumber } from "lodash"

export interface dataInputType {
  name?: string
  value?: string
  isError?: boolean
  message?: string
}

interface Types extends dataInputType {
  type?: "text" | "email" | "password" | "date" | "time"
  label?: string
  placeholder?: string
  icon?: any
  info?: {
    type: "split" | "replace"
    message: string
  },
  validate?: {
    rules: {
      required?: boolean
      minLength?: number
      maxLength?: number
      min?: number
      max?: number
      regex?: any
      same?:{
        field: string | null | undefined,
        fieldValue: string | null | undefined
      }
    },
    customMessage?: {
      required?: string
      minLength?: string
      maxLength?: string
      min?: string
      max?: string
      regex?: string
      same?: string
    }
  }
  onChange?: (data: dataInputType) => void
  onClear?: (data: dataInputType) => void
}

const Input = ({
  name,
  value,
  isError,
  message,
  type,
  label,
  placeholder,
  validate,
  icon,
  info,
  onChange,
  onClear,
}: Types) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [showPassword, setShowPassowrd] = useState<boolean>(false)

  const onChangeText = (val: string, changeType?: 'clear' | 'change') => {
    let fieldName = 'This field'
    let result: dataInputType = {
      value: val,
      isError: false,
      message: ''
    }
    if (name) result.name = name
    if (label) fieldName = label

    if (val) {
      if (validate?.rules?.maxLength) {
        if (val.length > validate.rules.maxLength) {
          result.isError = true
          result.message = validate?.customMessage?.maxLength ?? `${fieldName} maximum length ${validate.rules.maxLength > 1 ? 'are' : 'is'} ${validate.rules.maxLength} character${validate.rules.maxLength > 1 ? 's' : ''}`
        }
      }
    }

    if (val) {
      if (validate?.rules?.minLength) {
        if (val.length < validate.rules.minLength) {
          result.isError = true
          result.message = validate?.customMessage?.minLength ?? `${fieldName} minimum length ${validate.rules.minLength > 1 ? 'are' : 'is'} ${validate.rules.minLength} character${validate.rules.minLength > 1 ? 's' : ''}`
        }
      }
    }

    if (val) {
      if (validate?.rules?.max) {
        if(isNumber(val)) {
          if (parseInt(val) > validate.rules.max) {
            result.isError = true
            result.message = validate?.customMessage?.max ?? `${fieldName} maximum value ${validate.rules.max > 1 ? 'are' : 'is'} ${validate.rules.max}`
          }
        }
      }
    }

    if (val) {
      if (validate?.rules?.min) {
        if (isNumber(val)) {
          if (parseInt(val) < validate.rules.min) {
            result.isError = true
            result.message = validate?.customMessage?.min ?? `${fieldName} minimum value ${validate.rules.min > 1 ? 'are' : 'is'} ${validate.rules.min}`
          }
        }
      }
    }

    if (!val) {
      if (validate?.rules?.required) {
        result.isError = true
        result.message = validate?.customMessage?.required ?? `${fieldName} is required`
      }
    }

    if (validate?.rules?.min && validate?.rules?.max) {
      if (validate.rules.min > validate.rules.max) {
        result.isError = true
        result.message = `The minimum value must be lower then the maximum value`
      }
    }

    if (validate?.rules?.minLength && validate?.rules?.maxLength) {
      if (validate.rules.minLength > validate.rules.maxLength) {
        result.isError = true
        result.message = `The minimum length must be lower then the maximum length`
      }
    }

    if (validate?.rules?.regex) {
      if (!validate.rules.regex.test(val)) {
        result.isError = true
        result.message = validate?.customMessage?.regex ?? `${fieldName} is not valid`
      }
    }

    if (changeType === 'change') {
      if (onChange) onChange(result)
    } else if (changeType === 'clear') {
      if (onClear) onClear(result)
    }
  }

  const renderLabel = () => {
    if (label) {
      return (
        <div className={`absolute text-xs duration-300 ${icon ? 'pl-8' : 'pl-0'} ${value ? 'top-0' : isFocus ? 'top-0' : 'top-[20px] text-gray-300'} flex flex-row`}>
          <span className={isError ? "text-rose-500" : ""}>{label}</span>
          {validate?.rules?.required ? <span className="text-rose-500">*</span> : null}
        </div>
      )
    }
  }

  const renderIconTypePassword = () => {
    if (type === 'password') {
      return <div
        className="w-fit px-2 flex items-center justify-center cursor-pointer"
        onClick={() => setShowPassowrd(!showPassword)}
      >{showPassword ? <IoEye /> : <IoEyeOff />}</div>
    }
  }

  return (
    <div className={`w-full h-fit flex flex-col relative ${label ? 'pt-4' : 'pt-0'} gap-0`}>
      {renderLabel()}
      <div className="w-full flex flex-row">
        {icon ? <div className="w-fit px-2 flex items-center justify-center">{icon}</div> : null}
        <div className="w-full flex flex-col relative">
          <input
            name={name??""}
            type={type === 'password' ? showPassword ? 'text' : !showPassword ? 'password' : type??"text" : type??"text"}
            className={`w-full outline-none ${icon ? 'pl-0.5' : 'pl-0'} pt-1 duration-300 bg-transparent border-b border-b-gray-200 ${isError ? 'placeholder:text-rose-500' : 'placeholder:text-gray-300'}`}
            placeholder={!label ? placeholder??"Placeholder" : ""}
            value={value??""}
            onChange={(e) => onChangeText(e?.target?.value, "change")}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            autoComplete="new-password"
          />
          <div className={`absolute duration-300 bottom-0 border-b-2 ${isError ? 'border-b-rose-500 w-full' : isFocus ? 'border-b-cyan-500 w-full' : 'w-[0px]'}`}></div>
        </div>
        {value && onClear ? <div className="w-fit px-2 flex items-center justify-center cursor-pointer" onClick={() => onChangeText("", "clear")}><IoIosCloseCircle /></div> : null}
        {renderIconTypePassword()}
      </div>
      {info?.type === 'split' ? <span className={`${icon ? 'pl-8' : 'pl-0'} text-[10px]`}>{info?.message??''}</span> : null}
      <span className={`${isError ? 'text-rose-500' : ''} ${icon ? 'pl-8' : 'pl-0'} text-[10px]`}>{message ? message : info?.type === 'replace' ? info?.message : ''}</span>
    </div>
  )
}

export default Input