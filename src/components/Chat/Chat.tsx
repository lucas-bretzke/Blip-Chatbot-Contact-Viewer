// src/components/Chat.tsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessages } from '../../api/blipApi'

const Chat: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  // const { id } = useParams<{ id: string }>()
  const { id } = useParams<{ id: any }>()
  const [messages, setMessages] = useState<any[]>([]) // Tipo genérico, ajuste conforme necessário

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages(apiKey, id)
      setMessages(data.messages)
    }

    fetchMessages()
  }, [apiKey, id])

  return (
    <div>
      <h2>Conversas com Contato {id}</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.sender}: {msg.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Chat
