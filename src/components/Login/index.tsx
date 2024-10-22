import React, { useState } from 'react'

/**
 * Styles.
 */
import styled from 'styled-components'

/**
 * Types.
 */
interface LoginProps {
  onLogin: (apiKey: string) => void
}

/**
 * Screen.
 */
export default function Login({ onLogin }: LoginProps) {
  const [apiKey, setApiKey] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLogin(apiKey)
  }

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        type='text'
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder='Chave de API'
        required
      />
      <Button type='submit'>Entrar</Button>
    </LoginForm>
  )
}

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
