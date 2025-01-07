import { useEffect, useState } from "react"

import { useLocalStorage } from "~/lib/atoms/local-storage"

const MAX_TRIAL_COUNT = 10 // 设置最大试用次数

export function useTrialCount() {
  const { getValue: getTrialCount, setValue: setTrialCount } =
    useLocalStorage("trialCount")
  const [isTrialAvailable, setIsTrialAvailable] = useState(true)

  useEffect(() => {
    const trialCount = Number(getTrialCount())
    setIsTrialAvailable(trialCount < MAX_TRIAL_COUNT)
  }, [getTrialCount])

  const getSurplusTrialCount = () => {
    return MAX_TRIAL_COUNT - Number(getTrialCount())
  }

  const incrementTrialCount = () => {
    const trialCount = Number(getTrialCount())
    setTrialCount(String(Math.min(trialCount + 1, MAX_TRIAL_COUNT)));
  }

  return {
    getSurplusTrialCount,
    isTrialAvailable,
    incrementTrialCount,
    setIsTrialAvailable
  }
}
