import cssText from "data-text:~/style.css"
import { marked } from "marked"
import type { PlasmoCSConfig, PlasmoMountShadowHost } from "plasmo"
import { useEffect, useState } from "react"
import root from "react-shadow"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://www.amazon.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

export const getShadowHostId = () => "plasmo-markdown"

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor
}) => {
  anchor.element.appendChild(shadowHost)
}

const PlasmoPricingExtra = () => {
  const zhipuAIPort = usePort("zhipuAIPort")
  const [markdownMessage, setMarkdownMessage] = useState("")

  useEffect(() => {
    console.log("Use Effect That Streams Summary Called")
    if (
      zhipuAIPort.data?.messages !== undefined &&
      zhipuAIPort.data.isEnd === false
    ) {
    } else {
      console.log("End of messages")
      console.log(zhipuAIPort.data)
      if (zhipuAIPort.data?.messages?.data) {
        setMarkdownMessage(zhipuAIPort.data.messages.data.text.content)
      }
    }
  }, [zhipuAIPort.data?.messages])

  useEffect(() => {
    console.log("Use Effect That Streams Summary Error Called")
    if (
      zhipuAIPort.data?.error !== undefined &&
      zhipuAIPort.data?.error !== null
    ) {
      setMarkdownMessage(`# 错误: ${zhipuAIPort.data.error}`)
    } else {
      console.error(`# 错误: ${zhipuAIPort.data}`)
    }
  }, [zhipuAIPort.data?.error])

  function hanleGenerate() {
    let liTextList = []
    const title = document.querySelector("#productTitle")?.textContent
    // 使用这个函数

    const featurebullets = document.querySelectorAll(
      "#feature-bullets .a-unordered-list .a-list-item"
    )

    const productFactsDesktopExpander = document.querySelectorAll(
      "#productFactsDesktopExpander .a-unordered-list .a-list-item"
    )
    let list: NodeListOf<Element> = null
    if (featurebullets.length) {
      list = featurebullets
    } else if (productFactsDesktopExpander.length) {
      list = productFactsDesktopExpander
    }

    if (list) {
      const childrenArray = Array.from(list) as HTMLLIElement[]
      liTextList = childrenArray.map((item) => {
        return item.textContent
      })
    }

    const systemMassage = {
      role: "system",
      content:
        "你是一名亚马逊资深运营，要求编写的listing在亚马逊商城内SEO较好，且防止品牌名侵权"
    }

    const endMessage = {
      role: "user",
      content:
        "请帮我分析这个产品的卖点，请帮我分析这个产品的关键词，如果你要做一个一样的产品，你会怎么写这个产品的listing的标题，五点，产品描述，搜索关键字，英文"
    }

    const messages = [
      {
        role: "user",
        content: `标题：${title.trim()}`
      }
    ]
    liTextList.forEach((text) => {
      messages.push({
        role: "user",
        content: `${text.trim()}`
      })
    })
    messages.unshift(systemMassage)

    messages.push(endMessage)
    console.log(messages)

    setMarkdownMessage("# 生成中...")

    zhipuAIPort.send({
      messages
    })
  }

  return (
    <div className="drawer drawer-end">
      <input id="markdown-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="markdown-drawer"
          className="drawer-button btn fixed right-0 top-1/2"
          onClick={hanleGenerate}>
          生成Listing
        </label>
      </div>
      <div className="drawer-side overscroll-contain">
        <label
          htmlFor="markdown-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content overflow-auto h-full p-4 w-1/2 scrollbar-thin">
          <root.div>
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(markdownMessage)
              }}></div>
          </root.div>
        </div>
      </div>
    </div>
  )
}

export default PlasmoPricingExtra
