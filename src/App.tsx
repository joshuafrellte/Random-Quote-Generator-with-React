import { useState, useEffect } from 'react'

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
    <div className="font-serif flex flex-col justify-around items-center absolute top-1/2 left-1/2 -translate-1/2 px-8 py-8 h-[320px] w-[375px] bg-amber-100 rounded-lg shadow-md sm:w-[450px] sm:h-[350px] sm:px-10 sm:py-10">
      {/* <h1 className="text-center text-lg font-bold sm:text-2xl">Random Quote Generator</h1> */}
      <div className="flex flex-col justify-center grow">
        <p className="text-amber-950 text-center text-lg mb-5 sm:text-xl"><b>"</b> {currentQuote?.q} <b>"</b></p>
        <p className="text-amber-900 text-center uppercase tracking-widest text-lg italic">- {currentQuote?.a}</p>
      </div>
      <button className="mt-auto text-amber-50 bg-amber-600 px-6 py-2 w-fit rounded-sm cursor-pointer active:bg-amber-700 sm:text-lg sm:px-8 sm:py-2" onClick={fetchQuote}>Find Quote</button>
    </div>
  )
}

export default App
