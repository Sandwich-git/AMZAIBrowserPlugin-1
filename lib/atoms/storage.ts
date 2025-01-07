import { SecureStorage } from "@plasmohq/storage/secure"

export const storage = new SecureStorage({
    area: "local"
})

storage.setPassword("qwe") // TODO: Use a more secure password
