import cssText from "data-text:~/styles/style.css"
import type { PlasmoCSConfig, PlasmoMountShadowHost } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.amazon.com/*",
    "https://www.amazon.com.au/*",
    "https://www.amazon.com.be/*",
    "https://www.amazon.com.br/*",
    "https://www.amazon.ca/*",
    "https://www.amazon.cn/*",
    "https://www.amazon.eg/*",
    "https://www.amazon.fr/*",
    "https://www.amazon.de/*",
    "https://www.amazon.in/*",
    "https://www.amazon.it/*",
    "https://www.amazon.co.jp/*",
    "https://www.amazon.com.mx/*",
    "https://www.amazon.nl/*",
    "https://www.amazon.pl/*",
    "https://www.amazon.sa/*",
    "https://www.amazon.sg/*",
    "https://www.amazon.co.za/*",
    "https://www.amazon.es/*",
    "https://www.amazon.se/*",
    "https://www.amazon.com.tr/*",
    "https://www.amazon.ae/*",
    "https://www.amazon.co.uk/*"
  ]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
  // 有时会出现样式错误
  // const baseFontSize = 14
  // let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  // const remRegex = /([\d.]+)rem/g
  // updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
  //   const pixels = parseFloat(remValue) * baseFontSize
  //   return `${pixels}px`
  // })
  // const style = document.createElement("style")
  // style.textContent = updatedCssText
  // return style
}

export const getShadowHostId = () => "amz-ai"

export const mountShadowHost: PlasmoMountShadowHost = ({
  shadowHost,
  anchor
}) => {
  anchor?.element.appendChild(shadowHost)
}
