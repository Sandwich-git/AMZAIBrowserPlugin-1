import axios from "axios"

import type {
  GetListingInfo,
  GetProductDetails,
  GetShowPageContent
} from "~/types"

type FILTER_BY_STAR =
  | "one_star"
  | "two_star"
  | "three_star"
  | "four_star"
  | "five_star"

export const getListingInfo: GetListingInfo = () => {
  const liTextList: string[] = []

  const title = document.querySelector("#productTitle")?.textContent
  const featurebullets = document.querySelectorAll(
    "#feature-bullets .a-unordered-list .a-list-item"
  )

  const productFactsDesktopExpander = document.querySelectorAll(
    "#productFactsDesktopExpander .a-unordered-list .a-list-item"
  )
  let list: NodeListOf<Element> | null = null
  if (featurebullets.length) {
    list = featurebullets
  } else if (productFactsDesktopExpander.length) {
    list = productFactsDesktopExpander
  }

  if (list) {
    list.forEach((li) => {
      const content = li.textContent?.trim()
      if (content) {
        liTextList.push(content)
      }
    })
  }

  // 商品描述
  const productDescription = document
    .querySelector("#productDescription")
    ?.textContent?.trim()

  let pageContent = ""

  if (title) {
    pageContent = pageContent + `title: \n${title}\n`
  }

  if (liTextList.length) {
    pageContent = pageContent + `About this item: \n${liTextList.join("\n")}\n`
  }

  if (productDescription) {
    pageContent = pageContent + `productDescription: \n${productDescription}\n`
  }

  return [
    {
      role: "system",
      content:
        "你是一个资深亚马逊运营，你的任务是为用户提供专业、准确、有见地的建议。"
    },
    {
      role: "user",
      content: pageContent
    }
  ]
}

export const getProductDetails: GetProductDetails = () => {
  const textList: string[] = []

  // 产品信息
  const productInfoLeft = document.querySelectorAll(
    "#productDetails_expanderTables_depthLeftSections .a-expander-container"
  )
  const productInfoRight = document.querySelectorAll(
    "#productDetails_expanderTables_depthRightSections .a-expander-container"
  )

  if (productInfoLeft.length) {
    for (const element of productInfoLeft) {
      const declarative = element.querySelector(
        ".a-expander-prompt"
      ) as HTMLElement

      declarative?.click()

      const prodDetTable = element.querySelector(
        ".a-keyvalue.prodDetTable"
      ) as HTMLElement
      textList.push(
        `${declarative?.innerText?.trim()}\n${prodDetTable?.innerText?.trim()}`
      )
      declarative?.click()
    }
  }

  if (productInfoRight.length) {
    for (const element of productInfoRight) {
      const declarative = element.querySelector(
        ".a-expander-prompt"
      ) as HTMLElement

      declarative?.click()

      const prodDetTable = element.querySelector(
        ".a-keyvalue.prodDetTable"
      ) as HTMLElement
      textList.push(
        `${declarative?.innerText?.trim()}\n${prodDetTable?.innerText?.trim()}`
      )
      declarative?.click()
    }
  }

  return [
    {
      role: "user",
      content: textList.join(".")
    }
  ]
}

export const getShowPageContent: GetShowPageContent = () => {
  // const textList: string[] = []

  const liTextList: string[] = []

  const title = document.querySelector("#productTitle")?.textContent
  const featurebullets = document.querySelectorAll(
    "#feature-bullets .a-unordered-list .a-list-item"
  )

  const productFactsDesktopExpander = document.querySelectorAll(
    "#productFactsDesktopExpander .a-unordered-list .a-list-item"
  )
  let list: NodeListOf<Element> | null = null
  if (featurebullets.length) {
    list = featurebullets
  } else if (productFactsDesktopExpander.length) {
    list = productFactsDesktopExpander
  }

  if (list) {
    list.forEach((li) => {
      const content = li.textContent?.trim()
      if (content) {
        liTextList.push(" \n - " + content.trim().replace(/^-/, "") + " \n ")
      }
    })
  }

  let pageContent = ""

  if (title) {
    pageContent = pageContent + `### Title: \n **${title.trim()}** \n  `
  }

  if (liTextList.length) {
    pageContent =
      pageContent + `### About this item: \n ${liTextList.join("")} \n`
  }

  return pageContent
}

const getASIN = () => {
  if (!location.pathname) {
    return ""
  }

  const texts = location.pathname.match(/.*\/dp\/(.*?)\/?.*/s)
  if (texts && texts[1]) {
    return texts[1]
  }

  if (texts && texts[0]) {
    return texts[0].split("/dp/")[1].split("/")[0]
  }
}

const getReviewsList = (filterByStar: FILTER_BY_STAR, pageNumber: number) => {
  return Promise.resolve([])

}

const getReviewsListBy3Page = (filterByStar: FILTER_BY_STAR) => {
  return Promise.resolve([])
}

const oneStarReviews: string[] = []
const twoStarReviews: string[] = []
const threeStarReviews: string[] = []
const fourStarReviews: string[] = []
const fiveStarReviews: string[] = []
const starTypeList = [
  "one_star",
  "two_star",
  "three_star",
  "four_star",
  "five_star"
]

const starClass = ["a-star-1", "a-star-2", "a-star-3", "a-star-4", "a-star-5"]

const ASIN = getASIN()

export const getReviewsListByOneStar = () => {
  if (oneStarReviews.length) {
    return Promise.resolve(oneStarReviews)
  }

  return getReviewsListBy3Page("one_star").then((reviews) => {
    oneStarReviews.push(...reviews)
    return reviews
  })
}

export const getReviewsListByTwoStar = () => {
  if (twoStarReviews.length) {
    return Promise.resolve(twoStarReviews)
  }
  return getReviewsListBy3Page("two_star").then((reviews) => {
    twoStarReviews.push(...reviews)
    return reviews
  })
}

export const getReviewsListByThreeStar = () => {
  if (threeStarReviews.length) {
    return Promise.resolve(threeStarReviews)
  }
  return getReviewsListBy3Page("three_star").then((reviews) => {
    threeStarReviews.push(...reviews)
    return reviews
  })
}

export const getReviewsListByFourStar = () => {
  if (fourStarReviews.length) {
    return Promise.resolve(fourStarReviews)
  }
  return getReviewsListBy3Page("four_star").then((reviews) => {
    fourStarReviews.push(...reviews)
    return reviews
  })
}

export const getReviewsListByFiveStar = () => {
  if (fiveStarReviews.length) {
    return Promise.resolve(fiveStarReviews)
  }
  return getReviewsListBy3Page("five_star").then((reviews) => {
    fiveStarReviews.push(...reviews)
    return reviews
  })
}

const goodsPageReviewsList: string[] = []

const getGoodsPageReviewsList = (sortBy: "helpful" | "recent") => {
  return Promise.resolve([])
}

const dpReviewsList: string[] = []
const getDpReviewsList = () => {
  return []
}
const globalReviewsList: string[] = []
const getGlobalReviewsList = () => {
  return []
}

export const getGoodsPageReviews = () => {
  return Promise.resolve([])
}

export const getTrademarkText = () => {
  const bylineInfo = document.querySelector("#bylineInfo") as HTMLElement
  if (bylineInfo) {
    const href = bylineInfo.getAttribute("href")
    return (
      href?.split("stores/")[1]?.split("/page")[0]?.trim() ||
      href?.split("field-lbr_brands_browse-bin=")[1]?.trim()
    )
  }
}
