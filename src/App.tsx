import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

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
    <div className="absolute top-1/2 left-1/2 -translate-1/2 px-7 py-5 h-[300px] w-[375px] flex flex-col justify-between bg-blue-200 rounded-lg">
      <h1 className="text-center text-lg font-bold sm:text-xl">Random Quote Generator</h1>
      <div>
        <p className="text-justify text-lg mb-4 sm:text-xl"><b>"</b> {currentQuote?.q} <b>"</b></p>
        <p className="text-right italic">- {currentQuote?.a}</p>
      </div>
      <button className="bg-blue-400 px-3 py-1 w-fit rounded-sm cursor-pointer hover:bg-blue-500 active:bg-blue-600" onClick={fetchQuote}>New Quote</button>
    </div>
  )
}

export default App
