type ButtonProps<T> = { 
  value: T, 
  valueList: T[]
}

function Button<T>({ value, valueList }: ButtonProps<T>) {

  return (
    <>
    <button></button>
    </>
  )
}

export default Button;