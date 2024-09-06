import { Heading, Flex, Grid, useDisclosure, Spinner } from '@chakra-ui/react'

import { useTable } from '../../hooks/useTable'

import Lottie from 'lottie-react'
import emptyLottie from '../../assets/emptyLottie.json'

import { Table } from '../../interface/intrefaces'
import CreateTableModal from './components/CreateTableModal'
import { CardTable } from './components/CardTable'
import { ButtonCreate } from '../../components/ButtonCreate'


const Tables = () => {
  const { tables, createTable, deleteTable, loading } = useTable()
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(loading)

  return (
    <>
      <CreateTableModal isOpen={ isOpen } onClose={ onClose } createTable={ createTable } />

      <Grid className='absolute-container' height='100vh'>
        <Flex className='absolute-tables'></Flex>
      </Grid>

      <Flex p={ 5 } flexDirection={ 'column' } gap={ 4 }>
        { loading ? (
          // Mostrar spinner mientras se cargan las tablas
          <Flex justifyContent="center" alignItems="center" height="100vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            { tables.length > 0 ? (
              <>
                <Flex justifyContent={ 'space-between' } alignItems={ 'center' }>
                  <Heading fontSize='3xl'>Tus espacios de trabajo</Heading>
                  <ButtonCreate title='Crear tablero' onClick={ onOpen } />
                </Flex>

                <Grid
                  templateColumns={ {
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  } }
                  gap={ 6 }
                >
                  { tables.map((item: Table) => (
                    <CardTable
                      key={ item.id }
                      id={ item.id }
                      nombre={ item.nombre }
                      descripcion={ item.descripcion }
                      deleteTable={ deleteTable }
                    />
                  )) }
                </Grid>
              </>
            ) : (
              <Flex height='100vh' width='100%' justifyContent='center' zIndex={ 1 }>
                <Flex flexDirection='column' textAlign='center' padding='10px'>
                  <Lottie
                    loop
                    animationData={ emptyLottie }
                    height={ 10 }
                    width={ 10 }
                  />
                  <Heading fontSize='lg'>Parece que no tienes tableros creados, prueba creando uno nuevo!</Heading>
                  <ButtonCreate title='Crear tablero' onClick={ onOpen } />
                </Flex>
              </Flex>
            ) }
          </>
        ) }
      </Flex>
    </>
  )
}

export default Tables