import { createRef, useCallback, useEffect, useRef, useState } from 'react'

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([])

  const animatedRefs = useRef(new Map())
  const animationEndListeners = useRef(new Map())

  const handleAnimationEnd = useCallback((itemID) => {
    const removeListener = animationEndListeners.current.get(itemID)
    removeListener()

    animationEndListeners.current.delete(itemID)
    animatedRefs.current.delete(itemID)

    setItems((prevState) => prevState.filter((item) => item.id !== itemID))
    setPendingRemovalItemsIds((prevState) => prevState.filter((id) => id !== itemID))
  }, [])

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId)
      const animatedElement = animatedRef?.current
      const alreadyHasListener = animationEndListeners.current.has(itemId)

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId)
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd)
        }

        animatedElement.addEventListener('animationend', onAnimationEnd)
        animationEndListeners.current.set(itemId, removeListener)
      }
    })
  }, [handleAnimationEnd, pendingRemovalItemsIds])

  useEffect(() => {
    const removeListeners = animationEndListeners.current

    return () => {
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id])
  }, [])

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
