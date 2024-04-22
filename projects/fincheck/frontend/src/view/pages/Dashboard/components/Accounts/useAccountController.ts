import { useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'
import { useDashboard } from '../DashboardContext/useDashboard'

export function useAccountController() {
  const windowWidth = useWindowWidth()
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard()
  const [sliderState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false
  })

  return {
    sliderState,
    setSlideState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal
  }
}
