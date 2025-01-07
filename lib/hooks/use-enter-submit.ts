import { useRef, type RefObject } from "react"

export function useEnterSubmit(callbaxk: () => void): {
  formRef: RefObject<HTMLFormElement>
  onKeyDown: (e: React.KeyboardEvent) => void
  onKeyUp: (e: React.KeyboardEvent) => void
} {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    event.stopPropagation()

    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef?.current?.requestSubmit()
      callbaxk()
      event.preventDefault()
    }
  }

  const handelKeyUp = (event: React.KeyboardEvent): void => {
    event.stopPropagation()
  }

  return { formRef, onKeyDown: handleKeyDown, onKeyUp: handelKeyUp }
}
