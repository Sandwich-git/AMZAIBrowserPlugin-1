import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import { ZhipuAI } from "zhipuai-sdk-nodejs-v4"

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(
  cors({
    origin: "*"
  })
)

app.post("/chat", async (req, res) => {
  try {
    // 执行异步操作
    const data = await dialogue(req.body.messages);
    // 发送响应
    res.send({ text: data })
  } catch (error) {
    // 处理错误
    res.status(500).send({ error: "Internal Server Error" })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const dialogue = async (messages) => {
  // 智谱平台API KEY
  const ai = new ZhipuAI({
    apiKey: ""
  })
  const data = await ai.createCompletions({
    model: "glm-4-flash",
    messages: messages,
    stream: false
  })
  return data.choices[0].message
}
