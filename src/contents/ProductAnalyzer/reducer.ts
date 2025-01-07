import type { Action, State } from "~/types"

export const initialState: State = {
  isLogin: true,
  showPlugin: false,
  loading: false,
  isMessageNull: false,
  messageList: [],
  fullResponse: "",
  lastQuestion: [],
  contextRelationCoefficient: 3 // 控制上下文关系数字
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SHOW_PLUGIN":
      return { ...state, showPlugin: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_MESSAGE_NULL":
      return { ...state, isMessageNull: action.payload }
    case "PUSH_MESSAGE":
      return {
        ...state,
        messageList: [...state.messageList, action.payload]
      }
    case "SET_FULL_RESPONSE":
      return { ...state, fullResponse: action.payload }
    case "SET_LAST_QUESTION":
      return { ...state, lastQuestion: action.payload }
    case "SET_IS_LOGIN":
      return { ...state, isLogin: action.payload }
    default:
      return state
  }
}
