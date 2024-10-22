import React, { useEffect, useState } from 'react'
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
      const data = await getContacts(apiKey, page, 10)
      setContacts(data.resource.items)
      setLoading(false)
    }

    fetchContacts()
  }, [apiKey, page])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Contatos</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.identity}>
            <a href={`/contato/${contact.identity}`}>{contact.name}</a>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
        Anterior
      </button>
      <button onClick={() => setPage(prev => prev + 1)}>Próximo</button>
    </div>
  )
}

export default ContactList
