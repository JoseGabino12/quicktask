import { useState, useEffect } from "react"
import { toast } from "sonner"
import { type Table } from "../interface/intrefaces"

export const useTable = () => {
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const createTable = async (table: Table) => {
    setLoading(true)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(table)
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tables`, options)
    if (response.ok) {
      const data = await response.json()
      toast.success('Tabla creada con éxito!')
      setTables([...tables, data])
    }
    if (response.status === 400) {
      toast.error('Error en la solicitud, por favor revisa tus datos e inténtalo de nuevo.')
    }
    setLoading(false)
  }

  const deleteTable = async (id: number | undefined) => {
    setLoading(true)
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tables`, options)
    if (response.ok) {
      const newTables = tables.filter(table => table.id !== id)
      setTables(newTables)
      toast.success('Tabla eliminada con éxito!')
    }
    if (response.status === 400) {
      toast.error('Error en la solicitud, por favor revisa tus datos e inténtalo de nuevo.')
    }
    setLoading(false)
  
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tables`)
      .then(response => response.json())
      .then(data => setTables(data))
  }, [])

  return {
    tables,
    loading,
    createTable,
    deleteTable
  }
}