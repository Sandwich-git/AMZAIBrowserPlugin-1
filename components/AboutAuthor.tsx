import React from "react"

import icon5dPng from "~/assets/5.png"
import iconqrcodePng from "~/assets/qrcode.png"

type AboutAuthorProps = {
  isOpen: boolean
  onClose: () => void
}

export const AboutAuthor: React.FC<AboutAuthorProps> = React.memo(
  ({ isOpen, onClose }) => {
    if (!isOpen) return null
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-[92%] h-auto max-h-[85%] flex flex-col">
          <h2 className="text-2xl font-bold mb-4">关于AMZAI</h2>
          <div className="flex-1 scrollbar-none overflow-auto">
            <div className="mb-4">
              <span className="text-sm mb-2">
                AMZAI是一款基于先进AI模型的浏览器插件，亚马逊前台AI插件，专为亚马逊卖家设计。它能够智能分析页面内容、关键词和其他产品信息，帮助运营者快速完成产品分析、市场调研、关键词挖掘、Listing编写优化和产品POST文案编写等任务。
              </span>
              <br />
              <span className="text-sm mb-2">
                该插件免费使用的，由于内部实现使用了智谱AI，所以请注册智谱AI获取其API
                Key，现在智谱AI也是免费使用的。
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
            <h2 className="text-xl font-bold mb-4">关于作者</h2>
            <div className="mb-4">
              <span className="text-sm mb-2">
                一名多年开发经验的程序员，正在探索如何成为一名自由职业者。
              </span>
              <br />
              <span className="text-sm font-bold mb-2">
                定制开发或合作，请联系
              </span>
              <br />
              <span className="text-sm font-bold mb-2">
                邮箱: 1104152218@qq.com
              </span>
              <div className="w-full overflow-hidden mb-2">
                <span className="text-sm font-bold mb-2">微信：</span>
                <img
                  src={icon5dPng}
                  alt="4"
                  className="w-52 h-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button className="btn btn-outline" onClick={onClose}>
              关闭
            </button>
          </div>
        </div>
      </div>
    )
  }
)

AboutAuthor.displayName = "AboutAuthor"
