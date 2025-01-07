import { decrypt, encrypt } from "./aes"

export const useLocalStorage = (key: string) => {
  const encryptKey = encrypt(key)

  const getValue = (): string => {
    const value = window.localStorage.getItem(encryptKey)
    if (value) {
      return decrypt(value)
    }
    return ""
  }

  const setValue = (value: string) => {
    window.localStorage.setItem(encryptKey, encrypt(value))
  }

  const removeValue = () => {
    window.localStorage.removeItem(encryptKey)
  }

  return {
    getValue,
    setValue,
    removeValue
  }
}
