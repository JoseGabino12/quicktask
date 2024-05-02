import { useEffect, useState } from 'react'
import type { Table } from './interface/intrefaces'
import './App.css'

function App() {
  const [table, setTable] = useState([])

  const setTables = async () => {
    const response = await fetch("http://127.0.0.1:5000/tables")
    const data = await response.json()
    setTable(data)
    console.log(data)
  }

  useEffect(() => {
    setTables()
  }, [])

  return (
    <>
      <h1>Ad new table</h1>
      {
        table.map((item: Table) => {
          return (
            <div key={item.id}>
              <h2>{item.id}</h2>
              <h3>{item.nombre}</h3>
              <h3>{item.description}</h3>
            </div>
          )
        })
      }
    </>
  )
}

export default App
