export type Role = "assistant" | "user" | "system" | "error" | "null"

export interface Message {
  type?: "component" | "md"
  role: Role
  content: string
}

export type GetListingInfo = () => Message[]
export type GetProductDetails = () => Message[]
export type GetShowPageContent = () => string
export type PushMessage = (value: string, role?: Role) => void
export type SendZhipuAI = (params: {
  messages: Message[]
  isOpenAutoOptimization?: boolean
}) => void
export type HandleResend = () => void
export type HandleCopyToInput = (value: string) => void

export interface State {
  isLogin: boolean
  showPlugin: boolean
  loading: boolean
  isMessageNull: boolean
  messageList: Message[]
  fullResponse: string
  lastQuestion: Message[]
  contextRelationCoefficient: number
}

export interface ZhipuAIPortResponse {
  type?: string
  id?: string | number
  messages?: string
  error?: unknown
  isEnd?: boolean
}

export interface ZhipuAIPortrequest {
  apiKey: string
  messages: Message[]
}

export type Action =
  | { type: "SET_SHOW_PLUGIN"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGE_NULL"; payload: boolean }
  | { type: "SET_IS_LOGIN"; payload: boolean }
  | { type: "PUSH_MESSAGE"; payload: Message }
  | { type: "SET_FULL_RESPONSE"; payload: string }
  | { type: "SET_LAST_QUESTION"; payload: Message[] }
