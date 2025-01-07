// goodsAndServices 商标所涉及的商品和服务。商标的所有权通常是按商品或服务类别进行注册的，分类依据国际分类（NICE分类
// alive 商标是否处于有效状态
// wordmark 商标的名称，通常是文字商标或商标标识的文本部分
// ownerFullText 商标所有者的详细信息，通常包括法人（如公司名）、地址、国家等
// ownerName 商标所有者的名称，可能是公司、个人或组织的名称
// registrationType 商标的注册类型，通常指商标的法律注册级别
// markType 商标类型

export interface TrademarkData {
  source: {
    alive: boolean
    wordmark: string | null
    ownerName: string | null
    ownerFullText: string | null
    registrationType: string[]
    markType: string[]
    abandonDate: string | null
    cancelDate: string | null
    registrationDate: string | null
    filedDate: string | null
    goodsAndServices: string[]
    statusDescription: string | null
  }
}

// 检查商标是否处于某个状态
function checkGoodsAndServicesStatus(
  trademark: TrademarkData,
  status: string
): boolean {
  return trademark.source.goodsAndServices.some((service) =>
    service.includes(status)
  )
}

// 获取商标状态
export function getTrademarkStatus(trademark: TrademarkData): string {
  const {
    abandonDate,
    cancelDate,
    registrationDate,
    filedDate,
    statusDescription,
    alive
  } = trademark.source

  const liveTxt = alive ? "LIVE" : "DEAD"

  // 1. 商标已放弃
  if (abandonDate) return `${liveTxt} ABANDONED`

  // 2. 商标已取消
  if (cancelDate) return `${liveTxt} CANCELLED`

  // 3. 商标已注册
  if (registrationDate) return `${liveTxt} REGISTERED`

  // 4. 商标正在处理中，未放弃或取消
  if (filedDate && !abandonDate && !cancelDate) return `${liveTxt} PENDING`

  // 5. 如果商标的状态包含 WITHDRAWN、EXPIRED、REFUSED 或 REJECTED
  if (checkGoodsAndServicesStatus(trademark, "WITHDRAWN"))
    return "DEAD WITHDRAWN"
  if (checkGoodsAndServicesStatus(trademark, "EXPIRED")) return "DEAD EXPIRED"
  if (checkGoodsAndServicesStatus(trademark, "REFUSED")) return "DEAD REFUSED"
  if (checkGoodsAndServicesStatus(trademark, "REJECTED")) return "DEAD REJECTED"

  // 6. 商标最终被拒绝
  if (statusDescription?.includes("FINAL REFUSAL")) return "DEAD REFUSED"

  // 7. 商标允许通知，但尚未正式注册
  if (statusDescription?.includes("NOTICE OF ALLOWANCE")) return "PENDING"

  // 8. 商标已恢复
  if (statusDescription?.includes("REINSTATED")) return "REINSTATED"

  // 9. 商标被暂停
  if (statusDescription?.includes("SUSPENDED")) return "SUSPENDED"

  // 10. 商标部分注册，某些类别已注册
  if (statusDescription?.includes("PARTIALLY REGISTERED"))
    return `${liveTxt} PARTIALLY REGISTERED`

  // 11. 商标非活跃
  if (statusDescription?.includes("INACTIVATE")) return `${liveTxt} INACTIVATE`

  // 12. 默认返回 PENDING
  return `${liveTxt} PENDING`
}

// 英文状态与中文状态的映射
const statusMap: { [key: string]: string } = {
  "LIVE REGISTERED": "已注册",
  "LIVE PENDING": "待处理", // 正在待审或等待注册
  "LIVE PARTIALLY REGISTERED": "部分注册",
  "LIVE INACTIVATE": "非活跃",
  "DEAD ABANDONED": "放弃",
  "DEAD CANCELLED": "取消",
  "DEAD EXPIRED": "过期",
  "DEAD REFUSED": "拒绝",
  "DEAD WITHDRAWN": "撤回",
  "DEAD REJECTED": "拒绝注册",
  SUSPENDED: "暂停",
  WITHDRAWN: "撤回",
  PENDING: "待审查",
  REINSTATED: "恢复"
}

// 方法：将英文状态转化为中文
export function convertStatusToChinese(englishStatus: string): string {
  return statusMap[englishStatus] || "未知状态" // 如果未找到对应的中文，返回 "未知状态"
}
