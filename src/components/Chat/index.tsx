import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

/**
 * Services.
 */
import { getMessages } from '../../api/blipApi'

/**
 * Styles.
 */
import styled from 'styled-components'

/**
 * Types.
 */
interface Message {
  sender: string
  content: string
  direction: 'received' | 'sent'
}

/**
 * Screen
 */
export default function Chat({ apiKey }: { apiKey: string }) {
  const location = useLocation()
  const { id = '' } = useParams<{ id: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const { name } = location.state || { name: 'Contato desconhecido' }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(apiKey, id)

        data?.resource?.items
          ? setMessages(data.resource.items)
          : console.error('Estrutura de resposta inesperada: ', data)
      } catch (error) {
        console.error('Erro ao buscar mensagens: ', error)
      }
    }

    fetchMessages()
  }, [apiKey, id])

  return (
    <ChatContainer>
      <h2>
        Conversas com: <span style={{ color: '#007bff' }}>{name}</span>
      </h2>
      <MessageList>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <MessageItem key={index} direction={msg.direction}>
              {msg.sender}: {msg.content}
            </MessageItem>
          ))
        ) : (
          <li>Nenhuma mensagem encontrada.</li>
        )}
      </MessageList>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  padding: 20px;
`

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MessageItem = styled.li<{ direction: 'received' | 'sent' }>`
  padding: 10px;
  margin: 5px 0;
  max-width: 60%;
  border-radius: 10px;
  color: #fff;

  ${({ direction }) =>
    direction === 'received'
      ? `
    background-color: #007bff;
    align-self: flex-start;
    text-align: left;
    margin-right: auto;
  `
      : `
    background-color: #28a745;
    align-self: flex-end;
    text-align: right;
    margin-left: auto;
  `};
`
