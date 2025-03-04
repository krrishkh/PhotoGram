import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState('')

  useEffect(()=>{
    axios.get('/api/')
    .then((response) => {
      setData(response.data); // Handle success
    })
    .catch((error) => {
      console.error('Error fetching data:', error); // Handle error
    });
  }, []);



  return (
    <>
    <h1 className='tracking-tight font-thin text-center pt-5 text-3xl'>PhotoGram</h1>
    <p>{data}</p>

    </>
  )
}

export default App
