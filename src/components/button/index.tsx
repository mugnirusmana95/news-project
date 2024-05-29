interface Types {
  isFull?: boolean
  disabled?: boolean
  label?: string
  type?: "submit" | "reset"
  onClick?: () => void
}

const Button = ({
  isFull,
  disabled,
  label,
  type,
  onClick
}: Types) => {
  const renderStyleButton = () => {
    if (disabled) {
      return "bg-gray-300 border border-gray-300 cursor-default"
    } else {
      if (type === "submit") {
        return "bg-cyan-500 border border-cyan-500 text-white cursor-pointer hover:shadow-sm-cst"
      } else {
        return "bg-white-500 border border-gray-100 cursor-pointer hover:shadow-sm-cst"
      }
    }
  }

  return (
    <div
      className={`${isFull ? 'w-full' : 'w-fit'} uppercase flex items-center justify-center p-2 duration-300 ${renderStyleButton()} rounded`}
      onClick={() => !disabled && onClick ? onClick() : {}}
    >{label??'button'}</div>
  )
}

export default Button