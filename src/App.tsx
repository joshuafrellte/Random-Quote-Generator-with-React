import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Quote {
  q: string,
  a: string | null
}

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://corsproxy.io/?https://zenquotes.io/api/quotes");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data: Quote[] = await response.json();
        setQuotes(data)
        setCurrentQuote(data[Math.floor(Math.random() * data.length)])
      } catch (error) {
        if (error instanceof Error) setError(error.message) 
        else setError("Unknown Error")
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {    
    fetchQuote()
  }, [])

  return (
    <>
      <p>{currentQuote?.q}</p>
      <p>- {currentQuote?.a}</p>
      <button onClick={fetchQuote}>New Quote</button>
    </>
  )
}

export default App
