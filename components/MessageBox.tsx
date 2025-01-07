import {
  ArrowPathIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline"
import cssText from "data-text:~/styles/md.css"
import { marked } from "marked"
import React from "react"
import root from "react-shadow"

import { sendToBackground } from "@plasmohq/messaging"

import iconqrcodePng from "~/assets/qrcode.png"
import { useCopyToClipboard } from "~/lib/hooks/use-copy-to-clipboard"
import { useGetLanguageCountry } from "~/lib/hooks/use-get-language-country"
import type {
  HandleCopyToInput,
  HandleResend,
  Message,
  PushMessage,
  SendZhipuAI
} from "~/types"
import {
  getGoodsPageReviews,
  getListingInfo,
  getReviewsListByFiveStar,
  getReviewsListByFourStar,
  getReviewsListByOneStar,
  getReviewsListByThreeStar,
  getReviewsListByTwoStar,
  getShowPageContent,
  getTrademarkText
} from "~/utils/index"

interface MessageBoxProps {
  messagesList: Message[]
  loading: boolean
  fullResponse: string
  pushMessage: PushMessage
  sendZhipuAI: SendZhipuAI
  handleResend: HandleResend
  handleCopyToInput: HandleCopyToInput
  setLoading: (isLoading: boolean) => void
}

export const MessageBox = React.forwardRef<HTMLDivElement, MessageBoxProps>(
  (
    {
      messagesList,
      loading,
      fullResponse,
      pushMessage,
      sendZhipuAI,
      handleResend,
      handleCopyToInput,
      setLoading
    },
    ref
  ) => {
    const { getCountry, getLanguage } = useGetLanguageCountry()
    const { copyToClipboard, isCopied } = useCopyToClipboard()

    const trademarkSearch = async () => {
      try {
        setLoading(true)
        pushMessage("商标查询")

        const trademarkStr = getTrademarkText()
        if (!trademarkStr) {
          pushMessage("读取不到品牌名", "error")
          return
        }

        const response = await sendToBackground({
          name: "trademarkSearch",
          body: {
            trademarkStr
          }
        })

        if (response.messages) {
          pushMessage(response.messages)
        } else {
          pushMessage("查询不到商标信息", "error")
        }
      } catch (error) {
        pushMessage("查询商标出错", "error")
      } finally {
        setLoading(false)
      }
    }

    const generateAnalysisReviewsByGoodsPage = () => {
      setLoading(true)
      pushMessage("速读商品页评论")
      getGoodsPageReviews().then((reviews) => {
        try {
          if (!reviews.length) {
            pushMessage("读取不到评论", "null")
            setLoading(false)
            return
          }

          pushMessage(reviews.join(" <br/><br/> "), "null")

          const messages: Message[] = []

          reviews.forEach((text) => {
            messages.push({ role: "user", content: text })
          })

          messages.push({
            role: "user",
            content: `分析总结商品评论，列出用户反馈的问题，提出优化点，中文输出`
          })

          sendZhipuAI({
            messages
          })
        } catch (error) {
          setLoading(false)
        }
      })
    }

    const generateAnalysisReviewsByOneStar = () => {
      setLoading(true)
      pushMessage("速读一星评论")
      getReviewsListByOneStar().then((reviews) => {
        try {
          if (!reviews.length) {
            pushMessage(
              "读取不到一星评论，1、可能是没登录亚马逊个人账号，可以注册个人账号登录。2、可能没有相关评论。",
              "null"
            )
            setLoading(false)
            return
          }

          pushMessage(reviews.join(" <br/><br/> "), "null")

          const messages: Message[] = []

          reviews.forEach((text) => {
            messages.push({ role: "user", content: text })
          })

          messages.push({
            role: "user",
            content: `分析总结一星评论，列出用户反馈的问题，提出优化点，中文输出`
          })

          sendZhipuAI({
            messages
          })
        } catch (error) {
          setLoading(false)
        }
      })
    }

    const generateAnalysisReviewsByTwoStar = () => {
      setLoading(true)
      pushMessage("速读二星评论")
      getReviewsListByTwoStar().then((reviews) => {
        try {
          if (!reviews.length) {
            pushMessage(
              "读取不到二星评论，1、可能是没登录亚马逊个人账号，可以注册个人账号登录。2、可能没有相关评论。",
              "null"
            )
            setLoading(false)
            return
          }

          pushMessage(reviews.join(" <br/><br/> "), "null")

          const messages: Message[] = []

          reviews.forEach((text) => {
            messages.push({ role: "user", content: text })
          })

          messages.push({
            role: "user",
            content: `分析总结二星评论，列出用户反馈的问题，提出优化点，中文输出`
          })

          sendZhipuAI({
            messages
          })
        } catch (error) {
          setLoading(false)
        }
      })
    }

    const generateAnalysisReviewsByThreeStar = () => {
      setLoading(true)
      pushMessage("速读三星评论")
      getReviewsListByThreeStar().then((reviews) => {
        try {
          if (!reviews.length) {
            pushMessage(
              "读取不到三星评论，1、可能是没登录亚马逊个人账号，可以注册个人账号登录。2、可能没有相关评论。",
              "null"
            )
            setLoading(false)
            return
          }

          pushMessage(reviews.join(" <br/><br/> "), "null")

          const messages: Message[] = []

          reviews.forEach((text) => {
            messages.push({ role: "user", content: text })
          })

          messages.push({
            role: "user",
            content: `分析总结三星评论，列出用户反馈的问题，提出优化点，中文输出`
          })

          sendZhipuAI({
            messages
          })
        } catch (error) {
          setLoading(false)
        }
      })
    }

    const generateAnalysisReviewsByFourStar = () => {
      setLoading(true)
      pushMessage("速读四星评论")
      getReviewsListByFourStar().then((reviews) => {
        try {
          if (!reviews.length) {
            pushMessage(
              "读取不到四星评论，1、可能是没登录亚马逊个人账号，可以注册个人账号登录。2、可能没有相关评论。",
              "null"
            )
            setLoading(false)
            return
          }

          pushMessage(reviews.join(" <br/><br/> "), "null")

          const messages: Message[] = []

          reviews.forEach((text) => {
            messages.push({ role: "user", content: text })
          })

          messages.push({
            role: "user",
            content: `分析总结四星评论，列出用户反馈的问题，提出优化点，中文输出`
          })

          sendZhipuAI({
            messages
          })
        } catch (error) {
          setLoading(false)
        }
      })
    }

    const generateAnalysisReviewsByFiveStar = () => {
      setLoading(true)
      pushMessage("速读五星评论")
      getReviewsListByFiveStar().then((reviews) => {
        try {
          if (!reviews.length) {
            pushMessage(
              "读取不到五星评论，1、可能是没登录亚马逊个人账号，可以注册个人账号登录。2、可能没有相关评论。",
              "null"
            )
            setLoading(false)
            return
          }

          pushMessage(reviews.join(" <br/><br/> "), "null")

          const messages: Message[] = []

          reviews.forEach((text) => {
            messages.push({ role: "user", content: text })
          })

          messages.push({
            role: "user",
            content: `分析总结五星评论，列出用户反馈的问题，提出优化点，中文输出`
          })

          sendZhipuAI({
            messages
          })
        } catch (error) {
          setLoading(false)
        }
      })
    }
    const generateAnalysisInfo = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `
            1. 分析该产品的卖点（中文），指出其独特之处和吸引消费者的特点，目标用户群体。
            2. 详细分析产品的属性，包括但不限于材质、尺寸、颜色、设计风格等，并解释这些属性如何影响用户的使用体验。
            3. 描述产品的功能，包括基本功能和特殊功能，以及这些功能如何满足用户的特定需求。
            4. 基于产品信息，提炼出15个以上${getLanguage()}关键词。
            5. 分析并给出${getLanguage()}搜索关键字，这些关键字将用于产品在国际市场的搜索引擎优化，提炼出15个以上${getLanguage()}搜索关键字。
          `
      })

      pushMessage("分析Listing")

      sendZhipuAI({
        messages
      })
    }

    const generateProductTitle = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `
            商品名称长度
            商品名称不得超过 200 个字符（包括空格）。此上限适用于所有分类。

            商品名称要求
            适用于亚马逊全球商城中的所有非媒介类商品。如果违反以下四个条件之一，就可能导致非媒介类商品被禁止显示在搜索结果中：
            1、商品名称必须遵循商品所属分类的建议字符长度（包括空格）。
            2、商品名称不得包含促销用语，如 ［ free shipping ］ 、 ［ 100% quality guaranteed ］ 。
            3、商品名称不得包含用于装饰的字符，如 ~ ! * $ ? _ ~ { } # < > | * ; ^ ¬ ¦
            4、商品名称必须包含识别商品的信息，如 ［ hiking boots ］ 或 ［ umbrella ］ 。
            5、防止品牌名侵权。

            提示
            高品质的商品名称是确保在亚马逊商城提供良好买家体验的关键因素。以下是有关提高商品名称品质的其他提示。亚马逊仅会禁止违反上述四个要求之一的商品名称在搜索结果中显示，但强烈建议您遵守以下商品名称标准：

            商品名称应简洁。
            请勿全部使用大写字母。
            每个单词的首字母大写，但介词、 (in, on, over, with) 连词 (and, or, for) 或冠词 (the, a, an) 除外。
            使用数字： ［ 2 ］ ，而不是 ［ two two ］ 。
            请勿使用非语言 ASCII 字符，如 Æ, ©, or ®。
            商品名称应仅包含识别商品所需的最少信息。
            请勿使用主观性评价用语，如 ［ Hot Item ］ 或 ［ Best Seller ］ 。
            商品名称可以包含必要的标点符号，如连字符 (-)、正斜杠 (/)、逗号 (,)、和号 (&) 和句点 (.)。
            商品名称可以缩写测量值，如 ［ cm ］ , ［ oz ］ , ［ in ］ , and ［ kg ］ 。
            请勿在商品名称中包含您的卖家名称。
            尺寸和颜色变体应包含在子 ASIN 的商品名称中，而非包含在主要商品名称中。
            一个达标的标题最低要求应该是：

            1、200字符以内。但因为移动端仅展示标题的前60个字符，所以要将最重要的信息放在前60个字符以内；
            2、连贯易读，有逻辑；
            3、包含核心关键词，避免关键词堆砌。
            4、多插入关键词，提升SEO。

            标题撰写公式。
            核心关键词（出现品牌名使用兼容单词处理,如：Compatible with ）+特性词+尺寸/颜色+使用场景/人群

            基于产品信息，以上是具体要求，撰写一份${getLanguage()}商品名称，符合${getCountry()}消费者阅读习惯，在生成你的回答之前，请先阅读上面的要求。
          `
      })

      pushMessage("生成商品标题")

      sendZhipuAI({
        messages
      })
    }

    const generateFivePointDescription = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `
            高质量要点编写指南;
            以大写字母开头;
            采用句段形式；请勿使用末尾标点符号;
            使用分号分隔各个短语；在一个要点中;
            使用 10 个以上字符，但不超过 255 个字符;
            为要点添加标题，并在标题后面使用“:”，然后再在后面提供完整信息;
            在数字和度量单位之间添加一个空格（例如 60 ml）;
            使用清晰、自然的语言编写要点，避免使用不必要的关键词或短语;
            突出商品特征和优势，而不是品牌的营销活动;
            反面示例：限时折扣：现在购买，享受50%折扣;
            突出商品如何满足买家需求，而不只是列出事实;
            在商品变体之间保持数据一致;
            请勿转述或引用此 ASIN 不包含的其他商品;
            反面示例：充电速度：本充电器属于快充，和苹果官方售卖的充电器的充电速度一样快;
            去除或尽可能减少商品名称、商品描述或商品概览等属性的重复。突出附加信息或支持信息，以帮助买家做出更明智的决策;

            五点描述撰写公式:
            总结性词组/短语（卖点）+具体描述（针对总结性卖点延伸说明，适当使用长尾关键词）。

            多插入关键词，提升SEO。
            防止品牌名侵权。

            五点描述要求：
            第一点：突出商品最重要的功能或特性，这是吸引顾客的关键因素。
            第二点：可以描述商品的质量、材质或制作工艺等方面的优势。
            第三点：提及商品能为用户带来的好处，如解决某个问题、提升生活品质等。
            第四点：如果有独特的设计或卖点，可在此处详细说明。
            第五点：可以包含售后服务、保修政策或其他购买激励措施等内容。

            基于产品信息，以上是具体要求，撰写一份${getLanguage()}五点描述，符合${getCountry()}消费者阅读习惯，在生成你的回答之前，请先阅读上面的要求。
          `
      })

      pushMessage("生成五点描述")

      sendZhipuAI({
        messages
      })
    }

    const generateProductDescription = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `
            Product description是亚马逊产品Listing的长描述，它是对于产品核心卖点和重要参数的一个补充。买家在亚马逊移动端先看到的是产品描述，五行描述是需要展开才能看到的，所以产品描述部分也不容忽视。
            字数要求：2000字符以内。

            对于尚未品牌备案的listing来说，Product description可以对title和bullet points进行补充说明，可以写入一些售后政策、其他特性、产品参数、使用注意事项、包装配件等。
            而对于那些已经完成品牌备案的Listing来说，卖家可以利用A+页面的形式对自己的产品做进一步的说明，这对转化率的提升也会有很大的帮助。

            产品描述撰写技巧
            要有核心关键词做引导
            由于description本身可能字数相对比较多，正常情况下消费者没有那么多时间，也没有很好的耐心去完完全全看完，这样购物时间成本太高了。
            内容较多时，尽量用核心关键词做引导，比如最常用的Instructions，Package Includes，Kindly Note，Safety Warning等等。更快让消费者直接找到想到关注的点，而不是在一堆字母里慢慢找，建议引导的关键词加粗。
                
            避免使用 HTML、JavaScript 或其他代码
            如果产品描述的其中一行使用了HTML标记，则该行可能会被删除，也可能不显示HTML格式，具体取决于HTML标记的使用情况。
                  
            要多用分层数字符号
            建议多用分层数字符号，尤其当内容较多时，更有条理以及抓住消费者最关心的部分，常用就是阿拉伯数字，比如1,2,3,4.......

            要再次突出产品卖点
            由于PC端和移动端Listing展示的内容顺序有点不一样，description在移动端是最先展示在消费者面前的，所以有些产品卖点我们需要再次突出强调下，虽然可能在bullet point里也提过。
            
            要考虑客户使用场景
            有些产品因为操作上可能不太容易，甚至有些需要下载APP或者各种驱动，如果在description上不做说明，可能会影响顾客体验。

            要客观描述
            产品详情页面是卖家展示产品的第一位置，完善的产品内容描述可以帮助买家更直接的了解产品的相关信息，并在第一时间决定是否会购买此款产品，但卖家需注意的是要真实还原你的产品，很多买家会向亚马逊投诉买到的产品与相关描述不符，严重影响卖家的店铺绩效，所以客观描述产品是基本，尽可能的详细描述会为产品加分。

            注意！
            绝不允许出现以下类型的信息：
            卖家姓名
            E-mail地址
            网站网址
            具体的公司信息
            你所售卖的其他产品的详细信息
            促销用语，比如SALE或者free shipping(免邮)

            防止品牌名侵权。
            
            基于产品信息，以上是具体要求，撰写${getLanguage()}Product description，符合${getCountry()}消费者阅读习惯，在生成你的回答之前，请先阅读上面的要求。。
          `
      })

      pushMessage("生成商品描述")
      sendZhipuAI({
        messages
      })
    }

    const generateAProductDescription = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `
            商品A+描述注意事项
            1、避免使用特殊字符或符号，如®或™，小语种特殊字母除外。
            2、根据模板要求检查图像大小调整、分辨率等属性。
            3、避免拼写错误或语法错误。这些错误可能会导致创建失败。
            4、使用横幅可以带来更好的用户体验。
            5、比较图表是突出产品独特功能的好方法。
            6、文字不宜过多。

            充分展示产品卖点
            通过文字或数据对产品细节进行补充或详细解释，让你的顾客对你的产品充分了解。卖家进行补充时，要用对顾客友好并有帮助的文字进行阐述，而不是用一些销售术语泛泛而谈。品牌系列产品还可以有效利用对比图，阐述清楚各产品卖点的同时为同系列产品引流。
            
            防止品牌名侵权。

            基于产品信息，以上是具体要求，撰写5点${getLanguage()}商品A+描述，符合${getCountry()}消费者阅读习惯，在生成你的回答之前，请先阅读上面的要求。。
          `
      })

      pushMessage("生成商品A+描述")
      sendZhipuAI({
        messages
      })
    }

    const generateListing = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `
            基于产品信息，撰写一份${getLanguage()}标题和五点。以下是具体要求：

            1、符合亚马逊搜索引擎逻辑，符合亚马逊A9算法规则，listing肯定是要具备可收录性，可以被系统识别并收录。让亚马逊系统知道我们的产品是什么东西，从而让系统推荐给有需求的买家。
            2、方便关键词收录和加权的布局，把关键词巧妙的埋到listing不同地方，促进亚马逊对listing的收录。
            3、符合当地国的语法逻辑，买家要看得懂读得懂，文案还要具备可阅读性，要符合当地国买家的阅读习惯，让买家看得懂。
            4、要描述全面，产品的属性，包括但不限于材质、尺寸、颜色，产品参数越详细越好。

            标题要求:确保标题中包含至少五个关键词，并且简洁明了地传达产品的核心卖点。
            - 关键词优化：包含主要关键词，便于搜索引擎识别。
            - 简洁明了：标题不宜过长，一般控制在200个字符以内。
            - 品牌和型号：包含品牌名称和产品型号，便于识别。
            - 核心特点：突出产品的主要功能或特点（如尺寸、颜色、用途）。
            - 符合规则：遵循亚马逊的标题格式规范，避免使用特殊字符或过度宣传。

            商品要点要求: 属性信息、功能特点、产品优势、尺寸信息等信息要全面。
              - 突出优势：强调产品的独特卖点，如材料、技术、设计或其他优点。
              - 明确用途：说明产品的适用场景或目标用户，帮助消费者理解。
              - 解决问题：说明产品如何满足消费者需求或解决具体问题。
              - 使用清晰的语言：避免专业术语，确保消费者易于理解。
          `
      })

      pushMessage("生成标题和五点")

      sendZhipuAI({
        messages
      })
    }

    const generateKeyword = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `基于产品信息，提炼出50个左右${getLanguage()}亚马逊广告关键词。`
      })

      pushMessage("获取关键词")
      sendZhipuAI({
        messages
      })
    }

    const generateSearchKeyword = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `基于产品信息，提炼出50个左右${getLanguage()}亚马逊广告搜素关键词。`
      })

      pushMessage("获取搜素关键词")
      sendZhipuAI({
        messages
      })
    }

    const generateMarketingLanguage = () => {
      const messages = getListingInfo()
      messages.push({
        role: "user",
        content: `请帮我写几个关于这款产品的${getLanguage()}宣传标题，符合${getCountry()}消费者阅读习惯。`
      })

      pushMessage("生成商品营销语")

      sendZhipuAI({
        messages
      })
    }

    return (
      <div ref={ref} className="flex-1 scrollbar-thin overflow-auto px-2 py-1">
        <div className="chat chat-start">
          <div className="chat-bubble shadow-sm bg-white text-black">
            <div>
              <h3 className="text-xl font-bold mb-2">关于AMZAI</h3>
              <div className="flex-1 scrollbar-none overflow-auto">
                <div className="mb-2">
                  <span className="text-sm mb-2">
                    AMZAI是一款基于先进AI模型的浏览器插件，亚马逊前台AI插件，专为亚马逊卖家设计。它能够智能分析页面内容、关键词和其他产品信息，帮助运营者快速完成产品分析、市场调研、关键词挖掘、Listing编写优化和产品POST文案编写等任务。
                  </span>
                  <a
                    target="_blank"
                    className="link text-sm font-bold"
                    href="https://www.wjx.cn/vm/QFw5KY7.aspx">
                    提需求
                  </a>
                  <br />
                  <div className="w-full overflow-hidden my-2">
                    <span className="text-sm font-bold mb-2">
                      关注公众号获得最新的更新消息，
                      <a
                        target="_blank"
                        className="link"
                        href="https://mp.weixin.qq.com/s/6yC2sAc1aafwewZV26BdCg">
                        了解更多
                      </a>
                    </span>
                    <img
                      src={iconqrcodePng}
                      alt="4"
                      className="w-52 h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble shadow-sm bg-white text-black">
            <root.div>
              <style>{cssText}</style>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(getShowPageContent())
                }}
              />
            </root.div>
          </div>

          <div className="chat-footer opacity-50 flex items-center mt-1">
            <button
              onClick={() => copyToClipboard(getShowPageContent(), true)}
              className="btn btn-circle btn-xs btn-ghost mr-2"
              title={isCopied ? "已复制" : "点击复制文本"}>
              <ClipboardDocumentListIcon className="h-4 w-4 text-neutral hover:text-neutral-focus transition-colors duration-200" />
            </button>
          </div>
        </div>

        {messagesList.map((item, index) =>
          item.type === "component" ? (
           ""
          ) : (
            <div
              key={index}
              className={
                item.role === "user" ? "chat chat-end" : "chat chat-start"
              }>
              <div className="chat-bubble shadow-sm bg-white text-black">
                <root.div>
                  <style>{cssText}</style>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(item.content)
                    }}
                  />
                </root.div>
              </div>
              <div className="chat-footer opacity-50 flex items-center mt-1">
                {item.role === "user" ? (
                  <button
                    onClick={() => handleCopyToInput(item.content)}
                    className="btn btn-circle btn-xs btn-ghost mr-2"
                    title="点击复制到输入框">
                    <ClipboardDocumentListIcon className="h-4 w-4 text-neutral hover:text-neutral-focus transition-colors duration-200" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => copyToClipboard(item.content, true)}
                      className="btn btn-circle btn-xs btn-ghost mr-2"
                      title={isCopied ? "已复制" : "点击复制文本"}>
                      <ClipboardDocumentListIcon className="h-4 w-4 text-neutral hover:text-neutral-focus transition-colors duration-200" />
                    </button>
                    {index + 1 === messagesList.length && item.role !== "null" ? (
                      <button
                        onClick={handleResend}
                        className="btn btn-circle btn-xs btn-ghost"
                        title="重新回答">
                        <ArrowPathIcon className="h-4 w-4 text-neutral hover:text-neutral-focus transition-colors duration-200" />
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          )
        )}

        {loading && fullResponse ? (
          <div className="chat chat-start">
            <div className="chat-bubble shadow-sm bg-white text-black">
              <root.div>
                <style>{cssText}</style>
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(fullResponse)
                  }}
                />
              </root.div>
            </div>
          </div>
        ) : loading ? (
          <div className="chat chat-start">
            <div className="chat-bubble shadow-sm bg-white text-black">
              <div className="flex items-center">
                生成中
                <span className="loading loading-spinner"></span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="chat chat-start">
              <div className="chat-bubble shadow-sm bg-white text-black">
                <div className="flex flex-wrap">
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisInfo}>
                    分析Listing
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisReviewsByGoodsPage}>
                    速读商品评论
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisReviewsByOneStar}>
                    速读一星评论
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisReviewsByTwoStar}>
                    速读二星评论
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisReviewsByThreeStar}>
                    速读三星评论
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisReviewsByFourStar}>
                    速读四星评论
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAnalysisReviewsByFiveStar}>
                    速读五星评论
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateKeyword}>
                    获取关键词
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateSearchKeyword}>
                    获取搜素关键词
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={trademarkSearch}>
                    商标查询
                  </button>
                </div>
              </div>
            </div>

            <div className="chat chat-start">
              <div className="chat-bubble shadow-sm bg-white text-black">
                <div className="flex flex-wrap">
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateProductTitle}>
                    生成商品标题
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateFivePointDescription}>
                    生成商品五点
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateListing}>
                    生成商品标题和五点
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateProductDescription}>
                    生成商品描述
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateAProductDescription}>
                    生成A+描述
                  </button>
                  <button
                    className="btn m-2 max-w-52 drop-shadow-md"
                    onClick={generateMarketingLanguage}>
                    生成商品营销语
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
)

MessageBox.displayName = "MessageBox"
