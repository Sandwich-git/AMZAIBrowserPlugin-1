import axios from "axios"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { Message, ZhipuAIPortrequest, ZhipuAIPortResponse } from "~/types"

const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
const MODEL_NAME = "glm-4-flash"
const DONE_MARKER = "data: [DONE]"

async function createChatCompletion(
  apiKey: string,

  messages: Message[]
) {
  return axios({
    method: "post",
    url: API_URL,
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    responseType: "stream",
    data: {
      model: MODEL_NAME,
      messages: messages,
      stream: true
    }
  }).then((res) => {
    const stream = res.data
    return streamToJSON(stream)
  })
}

async function* streamToJSON(stream: ReadableStream) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim()
        if (line.startsWith("data: ") && line !== DONE_MARKER) {
          yield JSON.parse(line.slice(6))
        }
      }

      buffer = lines[lines.length - 1]
    }

    if (buffer.trim() && buffer.trim() !== DONE_MARKER) {
      yield JSON.parse(buffer.trim().slice(6))
    }
  } finally {
    reader.releaseLock()
  }
}

const handler: PlasmoMessaging.MessageHandler<
  ZhipuAIPortrequest,
  ZhipuAIPortResponse
> = async (req, res) => {
  if (!req.body) {
    res.send({ error: "缺少参数" })
    return
  }

  const { apiKey, messages } = req.body

  if (!apiKey || !messages) {
    res.send({ error: "缺少参数" })
    return
  }

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!tab?.id) {
      console.error("tab is not defined")
      res.send({ error: "缺少tabId" })
      return
    }

    const tabId = tab.id
    const completion = await createChatCompletion(apiKey, messages)
    let fullResponse = ""

    for await (const chunk of completion) {
      if (chunk.choices?.[0]?.delta?.content) {
        const content = chunk.choices[0].delta.content
        fullResponse += content
        chrome.tabs.sendMessage(tabId, {
          type: "update",
          id: chunk.id,
          messages: fullResponse,
          isEnd: false
        })
      }
    }
    res.send({ messages: fullResponse, isEnd: true })
  } catch (error) {
    console.error("Error in handler:", error)
    res.send({ error: error || "An unknown error occurred" })
  }
}

export default handler
