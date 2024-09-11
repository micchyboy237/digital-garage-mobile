import {
  ControllerFieldState,
  ControllerRenderProps,
  useController,
  UseControllerProps,
} from "react-hook-form"

export default function useField(
  props: UseControllerProps,
): ControllerRenderProps & ControllerFieldState {
  const { field, fieldState } = useController(props)

  return {
    ...field,
    ...fieldState,
  }
}
