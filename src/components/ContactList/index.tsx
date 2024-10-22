import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getContacts } from '../../api/blipApi'

interface Contact {
  identity: string
  name: string
}

interface ContactListProps {
  apiKey: string
}

function ContactList({ apiKey }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts(apiKey, page, 5)
      setContacts(data.resource.items)
      setLoading(false)
    }

    fetchContacts()
  }, [apiKey, page])

  if (loading) return <Loading>Loading...</Loading>

  return (
    <Container>
      <Title>Contatos</Title>
      <ContactListContainer>
        {contacts.map(contact => (
          <ContactItem key={contact.identity}>
            <StyledLink
              to={`/contato/${contact.identity}`}
              state={{ name: contact.name }}
            >
              {contact.name}
            </StyledLink>
          </ContactItem>
        ))}
      </ContactListContainer>
      <ButtonContainer>
        <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
          Anterior
        </Button>
        <Button onClick={() => setPage(prev => prev + 1)}>Próximo</Button>
      </ButtonContainer>
    </Container>
  )
}

export default ContactList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`

const ContactListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`

const ContactItem = styled.li`
  margin-bottom: 10px;
`

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const Loading = styled.div`
  font-size: 18px;
  color: #555;
  text-align: center;
  margin: 20px 0;
`
