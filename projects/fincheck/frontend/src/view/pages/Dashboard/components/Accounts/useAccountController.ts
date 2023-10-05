import { useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'

export function useAccountController() {
  const windowWidth = useWindowWidth()
  const [sliderState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false
  })

  return { sliderState, setSlideState, windowWidth }
}
