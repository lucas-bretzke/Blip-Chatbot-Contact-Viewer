// src/App.tsx
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Login from './components/Login/Login'
import ContactList from './components/ContactList/ContactList'
import Chat from './components/Chat/Chat'

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null)

  const handleLogin = (key: string) => {
    setApiKey(key)
    localStorage.setItem('apiKey', key)
  }

  const storedApiKey = localStorage.getItem('apiKey')
  if (storedApiKey && !apiKey) {
    setApiKey(storedApiKey)
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={
            apiKey ? <Navigate to='/' /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path='/'
          element={
            apiKey ? <ContactList apiKey={apiKey} /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/contato/:id'
          element={apiKey ? <Chat apiKey={apiKey} /> : <Navigate to='/login' />}
        />
      </Routes>
    </Router>
  )
}

export default App
