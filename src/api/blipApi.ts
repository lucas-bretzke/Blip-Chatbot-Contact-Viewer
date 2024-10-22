import axios from 'axios'

const API_BASE_URL = 'https://lucas-bretzke-fjdxg.http.msging.net/commands'

export const login = async (apiKey: string) => {
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
  const response = await axios.post(
    API_BASE_URL,
    {
      id: Math.random().toString(36).substring(7),
      to: 'postmaster@msging.net',
      method: 'get',
      uri: `/contacts?$skip=${(page - 1) * limit}&$take=${limit}`
    },
    {
      headers: {
        Authorization: `key bWV1cHJpbWVpcm9jaGF0Ym90MzM6WWk2WXhFUGJtNzBJREVXcDNnaHM=`,
        'Content-Type': 'application/json'
      }
    }
  )

  const contatos = response.data.resource.items
  console.log('Data', response.data.resource.items)

  return response.data
}

export const getMessages = async (apiKey: string, contactId: string) => {
  try {
    const requestBody = {
      id: Math.random().toString(36).substring(7),
      to: 'postmaster@msging.net',
      method: 'get',
      uri: `/threads/${contactId}`
    }

    const response = await axios.post(API_BASE_URL, requestBody, {
      headers: {
        // Authorization: `key ${apiKey}`,
        Authorization: `${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    console.log('res: ', response.data.resource.items)
    return response.data 
  } catch (error) {
    console.error('Erro ao buscar as mensagens: ', error)
    throw error
  }
}
