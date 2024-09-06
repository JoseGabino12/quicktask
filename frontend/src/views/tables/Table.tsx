import { Grid } from "@chakra-ui/react"
import { ButtonCreate } from "../../components/ButtonCreate"

const Table = () => {
  return (
    <>
      <Grid className='absolute-container' height='100vh' />

      <ButtonCreate title='Añade una lista' onClick={ () => console.log('Crear tablero') } />
    </>
  )
}

export default Table
