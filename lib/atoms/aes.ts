import CryptoJS from "crypto-js"

const secretPassphrase = CryptoJS.enc.Utf8.parse("qw12")
const iv = CryptoJS.enc.Utf8.parse("qw132")

export function encrypt(value: string) {
  const message = CryptoJS.enc.Utf8.parse(value)
  const encrypted = CryptoJS.AES.encrypt(message, secretPassphrase, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv
  }).toString()

  return encrypted
}

export function decrypt(value: string) {
  const decrypted = CryptoJS.AES.decrypt(value, secretPassphrase, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv
  }).toString(CryptoJS.enc.Utf8)
  return decrypted
}