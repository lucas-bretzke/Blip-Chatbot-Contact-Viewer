// src/api/blipApi.ts
import axios from 'axios'

const API_BASE_URL = 'https://your-blip-api-url.com' // Substitua pela URL da API do Blip

export const login = async (apiKey: string) => {
  // Implementar lógica para validar a chave da API
  // Exemplo:
  const response = await axios.get(`${API_BASE_URL}/login`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
  return response.data
}

export const getContacts = async (
  apiKey: string,
  page: number,
  limit: number
) => {
  const response = await axios.get(`${API_BASE_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    params: {
      page,
      limit
    }
  })
  return response.data
}

export const getMessages = async (apiKey: string, contactId: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/contacts/${contactId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }
  )
  return response.data
}
