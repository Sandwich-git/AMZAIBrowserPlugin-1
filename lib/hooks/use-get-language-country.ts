import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { useSessionStorage } from "~/lib/atoms/session-storage"
import { getTempApiKey } from "~/lib/atoms/temp-api-key"
import { getListingInfo } from "~/utils/index"

export function useGetLanguageCountry() {
  const language = useSessionStorage("language", "")
  const country = useSessionStorage("country", "")

  window.addEventListener("beforeunload", () => {
    language.removeStoredValue()
    country.removeStoredValue()
  })

  const jsonRegex = /{[\s\S]*?}/g

  useEffect(() => {
    if (language.storedValue && country.storedValue) {
      return
    }
    const messages = getListingInfo()
    messages.push({
      role: "user",
      content: `当是什么语言，属于什么国家？返回JSON字符串, JSON格式：{ "language": "", "country": "" }`
    })
    sendToBackground({
      name: "zhipuAIPort",
      body: {
        messages,
        apiKey: getTempApiKey()
      }
    })
      .then((response) => {
        if (response?.messages && response?.isEnd === true) {
          const jsonStr = response.messages.match(jsonRegex)[0] || "{}"
          const json = JSON.parse(jsonStr)
          language.setStoredValue(json.language)
          country.setStoredValue(json.country)
        }
      })
      .catch(() => {
        language.setStoredValue("英语")
        country.setStoredValue("美国")
      })
  }, [])

  return {
    getLanguage: () => language.storedValue,
    getCountry: () => country.storedValue
  }
}
