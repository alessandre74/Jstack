import { useEffect, useState, useCallback } from 'react'
import { toastEventManager } from '../../../utils/_toast'
import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'

export function TotastContainer() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration }
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id))
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
