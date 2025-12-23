import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Quote {
  content: string,
  author: string,
  loading: boolean
}

function App() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://corsproxy.io/?https://zenquotes.io/api/random");
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchQuote()
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
