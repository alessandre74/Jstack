import { createRef, useCallback, useEffect, useRef, useState } from 'react'

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([])

  const animatedRefs = useRef(new Map())
  const animationEndListeners = useRef(new Map())

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    setPendingRemovalItemsIds((prevState) => prevState.filter((itemId) => itemId !== id))
  }, [])

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId)
      const alreadyHasListener = animationEndListeners.current.has(itemId)

      if (animatedRef?.current && !alreadyHasListener) {
        animationEndListeners.current.set(itemId, true)
        animatedRef.current.addEventListener('animationend', () => {
          console.log('animationend executou')
          handleAnimationEnd(itemId)
        })
      }
    })
  }, [handleAnimationEnd, pendingRemovalItemsIds])

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

  console.log({ items, pendingRemovalItemsIds })

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
