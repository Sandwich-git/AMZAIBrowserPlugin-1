import {
  AcademicCapIcon,
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  TrashIcon
} from "@heroicons/react/24/outline"
import React from "react"

import { useTrialCount } from "~/lib/hooks/use-trial-count"

type DrawerHeaderProps = {
  toggleDrawer: () => void
  openAboutAuthor: () => void
  delectApiKey: () => void
  toSetApiKeyPage: () => void

  isHideTips: boolean
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = React.memo(
  ({
    toggleDrawer,
    openAboutAuthor,
    delectApiKey,
    toSetApiKeyPage,
    isHideTips
  }) => {
    const { getSurplusTrialCount } = useTrialCount()
    const handleAboutAuthorClick = () => {
      // 处理"关于我"按钮点击
      openAboutAuthor()
    }

    const handleCollapseClick = () => {
      // 处理"收起"按钮点击
      toggleDrawer()
    }

    return (
      <header className="relative navbar bg-base-100 px-4 min-h-0 h-[50px] border border-gray-200 shadow-md">
        <div className="flex-none dropdown dropdown-hover">
          <button
            className="p-1 rounded-full hover:bg-transparent"
            aria-label="Seting"
            title="设置"
            tabIndex={0}>
            <ListBulletIcon className="h-7 w-7" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-40 z-10 drop-shadow-md shadow">
            <li>
              <a onClick={toSetApiKeyPage}>
                <Cog6ToothIcon className="h-5 w-5" />
                设置API KEY
              </a>
            </li>
            <li>
              <a onClick={delectApiKey}>
                <TrashIcon className="h-5 w-5" />
                删除API KEY
              </a>
            </li>
            <li>
              <a onClick={handleAboutAuthorClick}>
                <QuestionMarkCircleIcon className="h-5 w-5" />
                作者AMZAI
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.wjx.cn/vm/QFw5KY7.aspx">
                <PencilSquareIcon className="h-5 w-5" />
                提需求
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://mp.weixin.qq.com/s/6yC2sAc1aafwewZV26BdCg">
                <AcademicCapIcon className="h-5 w-5" />
                教程
              </a>
            </li>
          </ul>
        </div>
        {isHideTips ? (
          ""
        ) : (
          <div className="flex-1 text-center inline-block">
            剩余临时使用次数: {getSurplusTrialCount()}
          </div>
        )}
        <div
          className={`${isHideTips ? "flex-1 flex justify-end" : "flex-none"}`}>
          <button
            className="p-1 rounded-full hover:bg-transparent"
            aria-label="Collapse"
            title="收起"
            onClick={handleCollapseClick}>
            <ArrowRightEndOnRectangleIcon className="h-7 w-7 text-gray-600 hover:text-gray-900" />
          </button>
        </div>
      </header>
    )
  }
)

DrawerHeader.displayName = "DrawerHeader"
