import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import { SlOptionsVertical } from 'react-icons/sl'


import { CardTableProps } from '../../../interface/intrefaces'

export const CardTable = ({ id, nombre, descripcion, deleteTable }: CardTableProps) => {

  return (
    <Card position="relative">
      <Menu>
        <MenuButton
          as={ IconButton }
          aria-label='Options'
          icon={ <SlOptionsVertical /> }
          variant='ghost'
          position="absolute"
          top="8px"
          right="8px"
          zIndex={ 1 }
        />
        <MenuList>
          <MenuItem icon={ <EditIcon /> } onClick={ () => console.log('Edit') }>
            Editar
          </MenuItem>
          <MenuItem
            icon={ <DeleteIcon /> }
            onClick={ () => deleteTable(id as number) }
          >
            Eliminar
          </MenuItem>
        </MenuList>
      </Menu>

      <CardBody as='a' href={ `/table/${id}` } >
        <Heading size='md'>{ nombre }</Heading>
        <Text>
          { descripcion }
        </Text>
      </CardBody>
      <CardFooter>
        {/* Aquí podrías agregar más elementos en el footer si es necesario */ }
      </CardFooter>
    </Card>
  )
}