import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

/**
 * Routes.
 */
import AppRoutes from './routes'

/**
 * App.
 */
export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleLogin = (key: string) => {
    setApiKey(key)
    localStorage.setItem('apiKey', key)
  }

  return (
    <Router>
      <AppRoutes apiKey={apiKey} handleLogin={handleLogin} />
    </Router>
  )
}
