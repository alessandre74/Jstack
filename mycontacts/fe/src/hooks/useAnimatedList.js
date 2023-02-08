import { createRef, useCallback, useRef, useState } from 'react'

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([])

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id])
  }, [])

  const animatedRefs = useRef(new Map())

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems((prevState) => prevState.filter((item) => item.id !== id))
  //   setPendingRemovalItemsIds((prevState) => prevState.filter((itemId) => itemId !== id))
  // }, [])

  const getAnimatedRef = useCallback((itemID) => {
    let animatedRef = animatedRefs.current.get(itemID)

    if (!animatedRef) {
      animatedRef = createRef()
      animatedRefs.current.set(itemID, animatedRef)
    }

    return animatedRef
  }, [])

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id)
        const animatedRef = getAnimatedRef(item.id)

        return renderItem(item, { isLeaving, animatedRef })
      }),
    [getAnimatedRef, items, pendingRemovalItemsIds]
  )

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList
  }
}

// const animatedElementRef = useRef(null)

//   useEffect(() => {
//     function handleAnimationEnd() {
//       onAnimationEnd(message.id)
//     }
//     const elementRef = animatedElementRef.current

//     if (isLeaving) {
//       elementRef.addEventListener('animationend', handleAnimationEnd)
//     }

//     return () => {
//       elementRef.removeEventListener('animationend', handleAnimationEnd)
//     }
//   }, [isLeaving, message.id, onAnimationEnd])
