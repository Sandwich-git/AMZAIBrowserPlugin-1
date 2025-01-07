import { marked } from "marked"
import { useCallback, useState } from "react"

interface UseCopyToClipboardResult {
  copyToClipboard: (text: string, isHtml?: boolean) => Promise<void>
  isCopied: boolean
}

export function useCopyToClipboard(
  resetInterval = 3000
): UseCopyToClipboardResult {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = useCallback(
    async (content: string, isHtml = false) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          if (isHtml) {
            const html = await marked.parse(content)
            const tempElement = document.createElement("div")
            tempElement.innerHTML = html
            await navigator.clipboard.writeText(tempElement.innerText)
          } else {
            await navigator.clipboard.writeText(content)
          }
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), resetInterval)
        }
      } catch (err) {
        console.error("Failed to copy: ", err)
        setIsCopied(false)
      }
    },
    [resetInterval]
  )

  return { copyToClipboard, isCopied }
}
