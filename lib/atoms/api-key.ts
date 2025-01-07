import { atomWithPlasmoStorage } from "./atom-with-plasmo-storage"

export const apiKeyAtom = atomWithPlasmoStorage<string | null>("apiKey", null)
