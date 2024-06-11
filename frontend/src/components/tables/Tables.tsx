import { Heading, Flex, Grid, Button, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { useTable } from '../../hooks/useTable'

import Lottie from 'lottie-react'

import emptyLottie from '../../assets/emptyLottie.json'

import { Table } from '../../interface/intrefaces'
import CreateTableModal from './CreateTableModal'

const Tables = () => {
  const { tables, createTable, deleteTable } = useTable()
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <CreateTableModal isOpen={ isOpen } onClose={ onClose } createTable={ createTable } />

      <Grid className='absolute-container' height='100vh'>
        <Flex className='absolute-tables'></Flex>
        <Flex height='100vh' width='100%' justifyContent='center' zIndex={ 1 }>
          {
            tables.length > 0 ? 
              tables.map((item: Table) => {
                return (
                  <div key={ item.id }>
                    <h2>{ item.id }</h2>
                    <h3>{ item.nombre }</h3>
                    <h3>{ item.descripcion }</h3>
                    <button>Editar</button>
                    <button onClick={ () => deleteTable(item.id) }>Eliminar</button>
                  </div>
                )
              })
            : 
              <Flex flexDirection='column' textAlign='center' padding='10px'>
                <Lottie
                  loop
                  animationData={ emptyLottie }
                  height={ 10 }
                  width={ 10 }
                />
                <Heading fontSize='lg'>Parece que no tienes tablas creadas, prueba creando una nueva!</Heading>
                <Button
                  onClick={ onOpen }
                  leftIcon={ <AddIcon /> }
                  as={ 'a' }
                  fontSize={ 'sm' }
                  fontWeight={ 600 }
                  color={ 'white' }
                  bg={ 'blue.400' }
                  _hover={ {
                    bg: 'blue.600',
                  } }
                  mt={ 4 }
                >
                  Crear tabla
                </Button>
              </Flex>
          }
        </Flex>
      </Grid>
    </>
  )
}

export default Tables
