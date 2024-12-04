import axios from "axios"

import type { PlasmoMessaging } from "@plasmohq/messaging"

type MessageOptions = {
  role: string
  content: string
}

async function createChatCompletion(model: string, messages: MessageOptions[]) {
  return axios({
    method: "post",
    url: "http://127.0.0.1:3000/chat",
    data: {
      messages: messages
    }
  })
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  const model = req.body.model
  const messages = req.body.messages

  try {
    const completion = await createChatCompletion(model, messages)
    res.send({ messages: completion, isEnd: true })
  } catch (error) {
    res.send({ error })
  }
}

export default handler
