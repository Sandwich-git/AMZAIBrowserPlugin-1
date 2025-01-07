import { useSetAtom } from "jotai"
import React, { useState } from "react"

import { apiKeyAtom } from "~/lib/atoms/api-key"
import { useLocalStorage } from "~/lib/atoms/local-storage"

interface SetupProps {
  isOpen: boolean
  onClose: () => void
}

export const Setup: React.FC<SetupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const [inputApiKey, setInputApiKey] = useState("")
  const setApiKey = useSetAtom(apiKeyAtom)
  const { setValue: setKeyApi } = useLocalStorage("apikey")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiKey(inputApiKey)
    setKeyApi(inputApiKey)
    onClose()
  }
  // console.log("Setup update")
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-xl w-[92%] h-auto max-h-[75%]  flex flex-col">
        <h2 className="text-2xl font-bold mb-4">设置API Key</h2>
        <div className="flex flex-1 flex-col scrollbar-thin overflow-auto p-2">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="password"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              placeholder="请输入 API Key"
              className="input input-bordered input-md w-full mb-4"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-neutral mb-4">
              保存 API Key
            </button>
            <button
              className="btn btn-outline mb-4"
              onClick={(e) => {
                e.preventDefault()
                window.open("https://www.bigmodel.cn/invite?icode=GMRTeiQJVw90cFhR4MiaReZLO2QH3C0EBTSr%2BArzMw4%3D")
              }}>
              获取 API Key
            </button>
          </form>
          <div>
            <a
              target="_blank"
              className="link"
              href="https://mp.weixin.qq.com/s/6yC2sAc1aafwewZV26BdCg">
              教程
            </a>
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

Setup.displayName = "Setup"
