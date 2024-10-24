import { Routes, Route, Navigate } from 'react-router-dom'

/**
 * Screens.
 */
import Login from '../components/Login'
import ContactList from '../components/ContactList'
import Chat from '../components/Chat'

/**
 * Types.
 */
interface RoutesProps {
  apiKey: string | null
  handleLogin: (key: string) => void
}

export default function AppRoutes({ apiKey, handleLogin }: RoutesProps) {
  return (
    <Routes>
      {/* Rota de login */}
      <Route
        path='/login'
        element={apiKey ? <Navigate to='/' /> : <Login onLogin={handleLogin} />}
      />

      {/* Rota para a lista de contatos */}
      <Route
        path='/'
        element={
          apiKey ? <ContactList apiKey={apiKey} /> : <Navigate to='/login' />
        }
      />

      {/* Rota para o chat de um contato específico */}
      <Route
        path='/contato/:id'
        element={apiKey ? <Chat apiKey={apiKey} /> : <Navigate to='/login' />}
      />
    </Routes>
  )
}
