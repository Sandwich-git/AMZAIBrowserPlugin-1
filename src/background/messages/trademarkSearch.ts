import axios from "axios"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { processGoodsAndServices } from "~/lib/niceClassification"
import {
  convertStatusToChinese,
  getTrademarkStatus,
  type TrademarkData
} from "~/lib/trademarkStatus"

const trademarkMap: { [key: string]: string[] } = {}

async function trademarkSearch(trademarkStr: string) {
  return axios({
    method: "post",
    url: "https://tmsearch.uspto.gov/api-v1-0-0/tmsearch",
    data: {
      query: {
        bool: {
          must: [
            {
              bool: {
                should: [
                  {
                    term: {
                      WM: {
                        value: trademarkStr,
                        boost: 6
                      }
                    }
                  },
                  {
                    match_phrase: {
                      WMP5: {
                        query: trademarkStr
                      }
                    }
                  },
                  {
                    query_string: {
                      query: trademarkStr,
                      default_operator: "AND",
                      fields: [
                        "goodsAndServices",
                        "markDescription",
                        "ownerName",
                        "translate",
                        "wordmark",
                        "wordmarkPseudoText"
                      ]
                    }
                  },
                  {
                    term: {
                      SN: {
                        value: trademarkStr
                      }
                    }
                  },
                  {
                    term: {
                      RN: {
                        value: trademarkStr
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      size: 100,
      from: 0,
      _source: [
        "abandonDate",
        "alive",
        "attorney",
        "cancelDate",
        "coordinatedClass",
        "currentBasis",
        "drawingCode",
        "filedDate",
        "goodsAndServices",
        "id",
        "internationalClass",
        "markDescription",
        "markType",
        "ownerFullText",
        "ownerName",
        "ownerType",
        "priorityDate",
        "registrationDate",
        "registrationId",
        "registrationType",
        "supplementalRegistrationDate",
        "translate",
        "usClass",
        "wordmark",
        "wordmarkPseudoText"
      ],
      min_score: 8
    }
  }).then((res) => {
    return res.data
  })
}

const generateMarkdownList = (items: string[]): string => {
  return items.map((item) => `  - ${item}`).join("\n")
}

const handler: PlasmoMessaging.MessageHandler<
  {
    trademarkStr: string
  },
  {
    messages?: string
    error?: unknown
  }
> = async (req, res) => {
  if (!req.body) {
    res.send({ error: "缺少参数" })
    return
  }

  const { trademarkStr } = req.body

  if (!trademarkStr) {
    res.send({ error: "缺少参数" })
    return
  }

  try {
    if (trademarkMap[trademarkStr]) {
      res.send({ messages: trademarkMap[trademarkStr].join("\n\n---\n\n") })
      return
    }

    const data = await trademarkSearch(trademarkStr)

    const trademarks: string[] = data?.hits?.hits
      ?.filter((item: TrademarkData) => {
        return item.source.wordmark?.toLocaleLowerCase() === trademarkStr?.toLocaleLowerCase()
      })
      .map((item: TrademarkData) => {
        const status = getTrademarkStatus(item)
        const statusCN = convertStatusToChinese(status)
        const goodsAndServicesList = processGoodsAndServices(
          item.source.goodsAndServices
        ).map((item) => item.details.name + "——" + item.original)

        const {
          wordmark,
          ownerName,
          ownerFullText,
          registrationType,
          markType,
          abandonDate,
          cancelDate,
          registrationDate,
          filedDate
        } = item.source

        const goodsAndServicesMarkdown =
          generateMarkdownList(goodsAndServicesList)
        const registrationTypeMarkdown = generateMarkdownList(registrationType)
        const markTypeMarkdown = generateMarkdownList(markType)
        const markdownArray = [
          `#### 商标名: ${wordmark}`,
          `- **商标状态**: ${status} —— ${statusCN}`,
          `- **所有者名称**: ${ownerName}`,
          `- **所有者全称**: ${ownerFullText}`,
          `- **商品和服务列表**:\n${goodsAndServicesMarkdown}`,
          `- **注册类型**:\n${registrationTypeMarkdown}`,
          `- **商标类型**:\n${markTypeMarkdown}`,
          abandonDate ? `- **放弃日期**: ${abandonDate}` : "",
          cancelDate ? `- **取消日期**: ${cancelDate}` : "",
          registrationDate ? `- **注册日期**: ${registrationDate}` : "",
          filedDate ? `- **申请日期**: ${filedDate}` : ""
        ]

        return markdownArray.filter((item) => item.trim() !== "").join("\n")
      })

    if (trademarks.length === 0) {
      res.send({ messages: "未找到相关商标" })
      return
    }

    trademarkMap[trademarkStr] = trademarks

    res.send({ messages: trademarks.join("\n\n---\n\n") })
  } catch (error) {
    console.error("Error in handler:", error)
    res.send({ error: error || "An unknown error occurred" })
  }
}

export default handler
