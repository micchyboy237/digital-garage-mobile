import React from "react"
import { useFormContext } from "react-hook-form"
import { FieldImage, FieldInput } from "./index"
import useField from "./useField"

interface FieldProps extends React.ComponentProps<typeof FieldInput> {
  name: string
  type?: "text" | "image"
}

export function Field({ name, type = "text", ...rest }: FieldProps) {
  const { register } = useFormContext()

  const {
    value,
    onChange: fieldOnChange,
    onBlur,
    ref,
    error: fieldError,
  } = useField({
    name,
  })

  const error = fieldError?.message

  if (type === "image") {
    console.log("FieldImage:", {
      name,
      value,
      error,
    })
    return (
      <FieldImage
        ref={ref}
        key={name}
        {...rest}
        {...register(name)}
        value={value?.uri}
        error={error}
        onChange={fieldOnChange}
      />
    )
  } else if (type === "text") {
    return (
      <FieldInput
        ref={ref}
        key={name}
        {...rest}
        {...register(name)}
        value={value}
        error={error}
        onChange={fieldOnChange}
        onBlur={onBlur}
      />
    )
  }

  throw new Error(`Field type "${type}" is not supported`)
}
