// src/components/Login.tsx
import React, { useState } from 'react'

interface LoginProps {
  onLogin: (apiKey: string) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [apiKey, setApiKey] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLogin(apiKey)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type='text'
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder='Chave de API'
        required
      />
      <button type='submit'>Entrar</button>
    </form>
  )
}

export default Login
