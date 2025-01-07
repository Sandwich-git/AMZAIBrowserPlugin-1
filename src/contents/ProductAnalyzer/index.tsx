import { useAtomValue, useSetAtom } from "jotai"
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from "react"

import { sendToBackground } from "@plasmohq/messaging"

import {
  AboutAuthor,
  DraggableLabel,
  DrawerHeader,
  InputArea,
  MessageBox,
  ResizableDrawer,
  Setup
} from "~/components"
import { apiKeyAtom } from "~/lib/atoms/api-key"
import { useLocalStorage } from "~/lib/atoms/local-storage"
import { getTempApiKey } from "~/lib/atoms/temp-api-key"
import { useDrawer } from "~/lib/hooks/use-drawer"
import { useTrialCount } from "~/lib/hooks/use-trial-count"
import type {
  HandleCopyToInput,
  HandleResend,
  Message,
  PushMessage,
  Role,
  SendZhipuAI,
  ZhipuAIPortResponse
} from "~/types"
import { getListingInfo } from "~/utils/index"

import { initialState, reducer } from "./reducer"

export { config, getShadowHostId, getStyle, mountShadowHost } from "./config"

const PlasmoPricingExtra: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    isLogin,
    lastQuestion,
    showPlugin,
    loading,
    isMessageNull,
    messageList,
    fullResponse,
    contextRelationCoefficient
  } = state

  const userInputRef = useRef<HTMLTextAreaElement>(null)
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const { isOpen, toggleDrawer } = useDrawer()

  // console.log("ProductAnalyzer update")
  const apiKey = useAtomValue(apiKeyAtom)
  const setApiKey = useSetAtom(apiKeyAtom)
  const { getValue: getApiKey, removeValue: removeApiKey } =
    useLocalStorage("apikey")

  const { incrementTrialCount, isTrialAvailable } = useTrialCount()
  const [isAboutAuthorOpen, setIsAboutAuthorOpen] = useState(false)
  const openAboutAuthor = () => setIsAboutAuthorOpen(true)
  const closeAboutAuthor = () => setIsAboutAuthorOpen(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.querySelector("#productTitle")) {
        clearInterval(interval)
        dispatch({ type: "SET_SHOW_PLUGIN", payload: true })
      }
    }, 500)

    setTimeout(() => {
      clearInterval(interval)
    }, 10000)
  }, [])

  useEffect(() => {
    if (isMessageNull) {
      setTimeout(() => {
        dispatch({ type: "SET_MESSAGE_NULL", payload: false })
      }, 2000)
    }
  }, [isMessageNull])

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: isLoading })
  }

  useEffect(() => {
    const handleError = () => {
      chrome.runtime.onMessage.removeListener(receiveMessages)
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  const getToken = useCallback((): string => {
    if (apiKey) {
      return apiKey
    }
    if (isTrialAvailable) {
      return getTempApiKey()
    }
    return ""
  }, [apiKey, isTrialAvailable, getTempApiKey])

  useEffect(() => {
    if (!apiKey) {
      const cachedAPIKEY = getApiKey()
      if (cachedAPIKEY) {
        setApiKey(cachedAPIKEY)
      }
    }
  }, [apiKey, setApiKey, getApiKey])

  const receiveMessages = useCallback(
    (
      request: ZhipuAIPortResponse,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      const { type, messages, isEnd } = request
      if (type === "update") {
        if (!isEnd && messages) {
          dispatch({ type: "SET_FULL_RESPONSE", payload: messages })
        }
      }
      sendResponse()
    },
    []
  )

  const pushMessage: PushMessage = useCallback(
    (value: string, role: Role = "user") => {
      dispatch({ type: "PUSH_MESSAGE", payload: { role, content: value } })

      setTimeout(() => {
        if (messageBoxRef.current) {
          messageBoxRef.current.lastElementChild?.scrollIntoView({
            block: "end",
            behavior: "smooth"
          })
        }
      }, 100)
    },
    [messageBoxRef]
  )

  const sendZhipuAI: SendZhipuAI = useCallback(
    async ({ messages }: { messages: Message[] }) => {
      try {
        if (!isTrialAvailable && !apiKey) {
          pushMessage("临时使用次数用完，左上角设置API Key", "error")
          return
        }

        if (!apiKey) {
          incrementTrialCount()
        }

        // dispatch({ type: "SET_LOADING", payload: true })
        setLoading(true)
        dispatch({ type: "SET_FULL_RESPONSE", payload: "" })
        dispatch({ type: "SET_LAST_QUESTION", payload: messages })
        chrome.runtime.onMessage.addListener(receiveMessages)
        const response = await sendToBackground({
          name: "zhipuAIPort",
          body: {
            messages,
            apiKey: getToken()
          }
        })

        if (response?.error !== undefined && response?.error !== null) {
          console.log(response)
          pushMessage("出错了，请重试，或重新填写API Key", "error")
          return
        }

        if (response?.messages && response?.isEnd === true) {
          pushMessage(response?.messages, "assistant")
          dispatch({ type: "SET_FULL_RESPONSE", payload: "" })
          return
        }
      } catch (error) {
        console.error("Error in sendZhipuAI:", error)
        pushMessage("出错了，请重试，或重新填写API Key", "error")
      } finally {
        // dispatch({ type: "SET_LOADING", payload: false })
        setLoading(false)
        chrome.runtime.onMessage.removeListener(receiveMessages)
      }
    },
    [getToken, pushMessage]
  )

  const handlerGenerate = useCallback(() => {
    if (loading) return
    const messages = getListingInfo()

    if (!userInputRef.current || !userInputRef.current.value) {
      dispatch({ type: "SET_MESSAGE_NULL", payload: true })
      return
    }

    // 处理Ai提问的上下文
    const historyAssistantMessage = []
    for (let i = messageList.length - 1; i > -1; i--) {
      const item = messageList[i]
      if (item.role === "assistant") {
        historyAssistantMessage.unshift(item)
      }
      if (historyAssistantMessage.length === contextRelationCoefficient) {
        break
      }
    }

    messages.push(...historyAssistantMessage)

    pushMessage(userInputRef.current.value)

    messages.push({
      role: "user",
      content: userInputRef.current.value
    })

    sendZhipuAI({
      messages
    })

    if (userInputRef.current) {
      userInputRef.current.value = ""
    }
  }, [
    loading,
    userInputRef,
    messageList,
    contextRelationCoefficient,
    pushMessage,
    sendZhipuAI
  ])

  const delectApiKey = useCallback(() => {
    setApiKey("")
    removeApiKey()
  }, [setApiKey, removeApiKey])

  const toSetApiKeyPage = useCallback(() => {
    dispatch({ type: "SET_IS_LOGIN", payload: false })
  }, [setApiKey, removeApiKey])

  const handleCopyToInput: HandleCopyToInput = useCallback(
    (value: string) => {
      if (userInputRef.current) {
        userInputRef.current.value = value
      }
    },
    [userInputRef]
  )

  const handleResend: HandleResend = useCallback(() => {
    sendZhipuAI({
      messages: lastQuestion
    })
  }, [lastQuestion])

  const memoizedMessageBox = useMemo(
    () => (
      <MessageBox
        ref={messageBoxRef}
        messagesList={messageList}
        loading={loading}
        fullResponse={fullResponse}
        setLoading={setLoading}
        pushMessage={pushMessage}
        sendZhipuAI={sendZhipuAI}
        handleCopyToInput={handleCopyToInput}
        handleResend={handleResend}
      />
    ),
    [messageList, loading, fullResponse, pushMessage, sendZhipuAI]
  )

  const memoizedInputArea = useMemo(
    () => (
      <InputArea
        ref={userInputRef}
        loading={loading}
        isMessageNull={isMessageNull}
        handlerGenerate={handlerGenerate}
      />
    ),
    [loading, isMessageNull, delectApiKey, handlerGenerate]
  )

  return showPlugin ? (
    <div className="drawer drawer-end direction-ltr">
      <DraggableLabel onClick={toggleDrawer}>AMZAI 助手</DraggableLabel>

      <ResizableDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
        <>
          <DrawerHeader
            isHideTips={!!apiKey}
            toggleDrawer={toggleDrawer}
            openAboutAuthor={openAboutAuthor}
            delectApiKey={delectApiKey}
            toSetApiKeyPage={toSetApiKeyPage}
          />
          <>
            {memoizedMessageBox}
            {memoizedInputArea}
          </>

          <Setup
            isOpen={!isLogin}
            onClose={() => {
              dispatch({ type: "SET_IS_LOGIN", payload: true })
            }}
          />
          <AboutAuthor isOpen={isAboutAuthorOpen} onClose={closeAboutAuthor} />
        </>
      </ResizableDrawer>
    </div>
  ) : null
}

export default PlasmoPricingExtra
