import { useEffect, useState } from "react"

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  key = "amzai-" + key
  // 创建一个state，其初始值从sessionStorage读取，如果没有则使用提供的initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // 使用useEffect来监听storedValue的变化，并将其保存到sessionStorage
  useEffect(() => {
    try {
      const value = storedValue
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  const removeStoredValue = () => {
    window.sessionStorage.removeItem(key)
  }

  return {
    storedValue,
    setStoredValue,
    removeStoredValue
  }
}
