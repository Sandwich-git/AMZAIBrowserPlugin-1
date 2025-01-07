import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import React from "react"

import { useEnterSubmit } from "~/lib/hooks/use-enter-submit"

interface InputAreaProps {
  loading: boolean
  isMessageNull: boolean
  handlerGenerate: () => void
}

export const InputArea = React.memo(
  React.forwardRef<HTMLTextAreaElement, InputAreaProps>(
    ({ loading, isMessageNull, handlerGenerate }, ref) => {
      const { onKeyDown, onKeyUp } = useEnterSubmit(handlerGenerate)
      // console.log("InputArea update")
      return (
        <div className="flex items-end m-2 mt-0 drop-shadow-md textarea-md textarea textarea-bordered focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-400 focus-within:ring-offset-1">
          <textarea
            ref={ref}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              e.target.style.height = "auto" // 必须使用，否则不生效
              e.target.style.height = e.target.scrollHeight + "px"
            }}
            placeholder="输入你的问题或需求"
            rows={4}
            className="w-full leading-normal resize-none scrollbar-thin border-none outline-none max-h-[16em]"
          />

          <div
            className={`ml-2 tooltip tooltip-error ${isMessageNull ? "tooltip-open" : "tooltip-hide"}`}
            data-tip="请输入提问">
            <button
              className="btn btn-circle btn-outline btn-sm"
              disabled={loading}
              onClick={handlerGenerate}>
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      )
    }
  )
)

InputArea.displayName = "InputArea"
