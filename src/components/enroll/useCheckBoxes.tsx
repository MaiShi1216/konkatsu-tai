import React, { useState } from 'react'

export const useCheckBoxes = (
  initBoxesStatus: string[],
): [hobbies: string[], handleHobbies: (boxLabel: string, isAddition: boolean) => void] => {
  const [statuses, setStatuses] = useState<string[]>(initBoxesStatus)

  const handleStatuses = (boxLabel: string, isAddition: boolean) => {
    if (isAddition) {
      setStatuses(() => [...statuses, boxLabel])
    } else {
      setStatuses(() => statuses.filter((status) => status !== boxLabel))
    }
  }

  return [statuses, handleStatuses]
}
