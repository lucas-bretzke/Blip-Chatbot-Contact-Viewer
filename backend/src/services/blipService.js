// src/services/blipService.js
const axios = require('axios')

const BLIP_API_URL = 'https://http.msging.net/commands'

// Função para validar a chave API do Blip
const validateApiKey = async apiKey => {
  try {
    const response = await axios.post(
      BLIP_API_URL,
      {
        id: '1',
        to: 'postmaster@msging.net',
        method: 'get',
        uri: '/ping'
      },
      {
        headers: {
          Authorization: `Key ${apiKey}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Invalid API key')
  }
}

// Função para buscar contatos paginados
const fetchContacts = async (apiKey, page, pageSize) => {
  try {
    const response = await axios.post(
      BLIP_API_URL,
      {
        id: '2',
        to: 'postmaster@msging.net',
        method: 'get',
        uri: `/contacts?page=${page}&pageSize=${pageSize}`
      },
      {
        headers: {
          Authorization: `Key ${apiKey}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Error fetching contacts')
  }
}

// Função para buscar a conversa de um contato específico
const fetchConversation = async (apiKey, contactId) => {
  try {
    const response = await axios.post(
      BLIP_API_URL,
      {
        id: '3',
        to: 'postmaster@msging.net',
        method: 'get',
        uri: `/messages/${contactId}`
      },
      {
        headers: {
          Authorization: `Key ${apiKey}`
        }
      }
    )

    return response.data
  } catch (error) {
    throw new Error('Error fetching conversation')
  }
}

module.exports = {
  validateApiKey,
  fetchContacts,
  fetchConversation
}
