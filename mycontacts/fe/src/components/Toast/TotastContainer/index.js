import { useEffect, useState } from 'react'
import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'

export function TotastContainer() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = event.detail

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text }
      ])
    }

    document.addEventListener('addtoast', handleAddToast)

    return () => {
      document.removeEventListener('addtoast', handleAddToast)
    }
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  )
}
