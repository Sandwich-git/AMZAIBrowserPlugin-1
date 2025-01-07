// 定义NICE分类的详细信息
export interface NiceClassification {
  name: string // 分类名称
  description: string // 分类描述
  examples: string[] // 示例
}

// 商品类（IC 1 至 IC 34）和服务类（IC 35 至 IC 45）详细信息
const niceClassificationDetails: Record<string, NiceClassification> = {
  "IC 1": {
    name: "化学品",
    description: "化学品，包括化肥、杀虫剂、工业化学品等。",
    examples: ["化肥", "杀虫剂", "工业化学品", "清洁剂", "涂料"]
  },
  "IC 2": {
    name: "颜料、油漆",
    description: "颜料、油漆及其相关产品。",
    examples: ["油漆", "涂料", "颜料"]
  },
  "IC 3": {
    name: "清洁和美容产品",
    description: "化妆品、香水、卫生和美容产品。",
    examples: ["香水", "护肤品", "口红", "洗发水", "美容护理产品"]
  },
  "IC 4": {
    name: "工业油脂和润滑剂",
    description: "工业用油脂、润滑剂等。",
    examples: ["润滑剂", "工业油脂"]
  },
  "IC 5": {
    name: "药品",
    description: "包括药品、药剂、药物和医疗制品。",
    examples: ["药品", "医药制品", "药剂"]
  },
  "IC 6": {
    name: "金属材料",
    description: "金属原料、合金等。",
    examples: ["钢铁", "铝", "铜", "金属合金"]
  },
  "IC 7": {
    name: "机器和机械设备",
    description: "机械设备、机器、动力设备等。",
    examples: ["机械设备", "动力机器", "工业设备"]
  },
  "IC 8": {
    name: "手工工具",
    description: "手工工具和器具。",
    examples: ["钳子", "螺丝刀", "锤子"]
  },
  "IC 9": {
    name: "电子和电气设备",
    description: "计算机、手机、电视、电子元件、工具等。",
    examples: ["计算机", "手机", "耳机", "相机", "电视"]
  },
  "IC 10": {
    name: "计算机软件",
    description: "计算机程序、应用软件、操作系统等。",
    examples: ["操作系统", "软件", "计算机程序"]
  },
  "IC 11": {
    name: "电子仪器",
    description: "用于电子和电气的仪器。",
    examples: ["电子仪器", "电气仪器"]
  },
  "IC 12": {
    name: "仪器",
    description: "精密仪器及其配件。",
    examples: ["测量仪器", "实验室设备"]
  },
  "IC 13": {
    name: "武器",
    description: "武器及其配件。",
    examples: ["枪支", "弹药", "爆炸物"]
  },
  "IC 14": {
    name: "贵金属和贵金属合金",
    description: "贵金属及其合金，如金、银、铂等。",
    examples: ["金", "银", "铂", "贵金属合金"]
  },
  "IC 15": {
    name: "乐器",
    description: "各种乐器。",
    examples: ["吉他", "钢琴", "小提琴"]
  },
  "IC 16": {
    name: "纸张和印刷制品",
    description: "纸张、书籍、印刷材料。",
    examples: ["书籍", "海报", "名片"]
  },
  "IC 17": {
    name: "橡胶、塑料及其制品",
    description: "橡胶、塑料及其衍生品。",
    examples: ["橡胶", "塑料袋", "塑料管"]
  },
  "IC 18": {
    name: "皮革和皮革制品",
    description: "皮革及其制品。",
    examples: ["皮包", "皮鞋", "皮带"]
  },
  "IC 19": {
    name: "建筑材料",
    description: "建筑材料，如水泥、砖石等。",
    examples: ["水泥", "砂石", "砖块"]
  },
  "IC 20": {
    name: "家具",
    description: "各类家具。",
    examples: ["沙发", "床", "桌子"]
  },
  "IC 21": {
    name: "烹饪用具和器具",
    description: "厨房器具、餐具。",
    examples: ["锅", "刀具", "餐盘"]
  },
  "IC 22": {
    name: "绳索和网状物品",
    description: "绳索、网状物品等。",
    examples: ["绳子", "网", "帆布"]
  },
  "IC 23": {
    name: "纺织纤维",
    description: "天然和人造纤维。",
    examples: ["棉花", "羊毛", "合成纤维"]
  },
  "IC 24": {
    name: "纺织品和床上用品",
    description: "织物和床上用品。",
    examples: ["床单", "枕头", "毛巾"]
  },
  "IC 25": {
    name: "服装",
    description: "衣物、鞋帽等。",
    examples: ["衣服", "鞋子", "帽子", "围巾", "袜子"]
  },
  "IC 26": {
    name: "针织制品",
    description: "针织品和编织品。",
    examples: ["毛衣", "针织帽", "编织袋"]
  },
  "IC 27": {
    name: "地毯、地垫和地板",
    description: "地毯、地垫等。",
    examples: ["地毯", "地板", "地垫"]
  },
  "IC 28": {
    name: "玩具和游戏",
    description: "儿童玩具、游戏设备等。",
    examples: ["玩具", "棋盘游戏", "视频游戏"]
  },
  "IC 29": {
    name: "食品",
    description: "食品，如肉类、蔬菜等。",
    examples: ["肉类", "鱼", "奶制品", "豆制品"]
  },
  "IC 30": {
    name: "糖果和面包",
    description: "糖果、饼干、面包等。",
    examples: ["糖果", "面包", "饼干", "巧克力"]
  },
  "IC 31": {
    name: "农业、园艺产品",
    description: "农业、园艺产品。",
    examples: ["种子", "园艺工具", "花卉"]
  },
  "IC 32": {
    name: "啤酒和非酒精饮料",
    description: "啤酒和非酒精饮料。",
    examples: ["啤酒", "果汁", "矿泉水"]
  },
  "IC 33": {
    name: "酒精饮料",
    description: "酒类饮料。",
    examples: ["葡萄酒", "烈酒", "啤酒"]
  },
  "IC 34": {
    name: "香烟和烟草产品",
    description: "香烟、雪茄、烟草制品。",
    examples: ["香烟", "雪茄", "烟草"]
  },
  "IC 35": {
    name: "广告和商业服务",
    description: "广告、市场营销、商业管理等。",
    examples: ["广告", "市场营销", "商业管理", "销售代理"]
  },
  "IC 36": {
    name: "金融和保险服务",
    description: "金融、银行、保险等服务。",
    examples: ["保险", "投资", "银行服务"]
  },
  "IC 37": {
    name: "建设和修理服务",
    description: "建筑和维修服务。",
    examples: ["建筑服务", "修理服务", "安装服务"]
  },
  "IC 38": {
    name: "通信服务",
    description: "通信服务。",
    examples: ["电话服务", "互联网服务", "电信服务"]
  },
  "IC 39": {
    name: "运输和物流服务",
    description: "运输、仓储、物流服务。",
    examples: ["物流", "运输", "快递服务"]
  },
  "IC 40": {
    name: "材料处理服务",
    description: "材料处理、加工服务。",
    examples: ["印刷服务", "金属加工", "回收服务"]
  },
  "IC 41": {
    name: "教育、娱乐、体育和文化服务",
    description: "教育、电影制作、体育活动等。",
    examples: ["教育", "体育活动", "电影制作", "文化活动"]
  },
  "IC 42": {
    name: "科技和研究服务",
    description: "技术开发、科研、软件开发等。",
    examples: ["软件开发", "技术咨询", "互联网服务"]
  },
  "IC 43": {
    name: "餐饮、住宿和餐馆服务",
    description: "餐饮和住宿服务。",
    examples: ["餐厅", "酒店", "住宿"]
  },
  "IC 44": {
    name: "医疗和美容服务",
    description: "医疗、健康、外科和美容服务。",
    examples: ["医疗服务", "美容", "健康护理"]
  },
  "IC 45": {
    name: "法律和社会服务",
    description: "法律、社会和个人服务。",
    examples: ["法律咨询", "婚姻咨询", "社会服务"]
  }
}

// 根据描述返回NICE分类详细信息
export function getNiceClassification(key: string): NiceClassification {
  const data = niceClassificationDetails[key]

  if (data) {
    return data
  }

  // 如果没有匹配的分类，则返回 "未知分类"
  return {
    name: "未知分类",
    description: "该描述没有匹配到任何NICE分类",
    examples: []
  }
}

export function processGoodsAndServices(goodsAndServices: string[]) {
  return goodsAndServices.map((item) => {
    // 提取 IC 和类别号部分
    const matches = item.match(/IC (\d{1,3})/)
    if (matches) {
      let classification = matches[0]

      // 清理类别号，处理带前导零的情况
      classification = classification.replace(/^IC 0+(\d+)$/, "IC $1")

      // 调用 niceClassificationDetails 返回详细信息
      const classificationDetails = getNiceClassification(classification)

      return {
        original: item,
        classification,
        details: classificationDetails
      }
    }
    return { original: item, classification: "未知", details: getNiceClassification("未知") }
  })
}
