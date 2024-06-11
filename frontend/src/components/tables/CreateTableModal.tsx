import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'

import { useForm } from '../../hooks/useForm'

import { ModalProps } from '../../interface/intrefaces'
import { useState } from 'react'

const CreateTableModal = ({ isOpen, onClose, createTable }: ModalProps) => {
  const [error, setError] = useState({
    nombre: false,
    descripcion: false
  })

  const { formState, onInputChange, onResetForm } = useForm({
    nombre: '',
    descripcion: ''
  })

  const handleSubmit = () => {
    const newError = {
      nombre: !formState.nombre,
      descripcion: !formState.descripcion
    };

    if (!newError.nombre && !newError.descripcion) {
      createTable(formState);
      handleClose();
    } else {
      setError(newError);
    }
  }

  const handleClose = () => {
    onResetForm()
    setError({ nombre: false, descripcion: false })
    onClose()
  }

  return (
    <>
      <Modal size='lg' isCentered isOpen={ isOpen } onClose={ handleClose }>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear una nueva tabla</ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' gap={6}>
            <FormControl isRequired isInvalid={ error.nombre }>
              <FormLabel htmlFor='nombre'>Nombre de la tabla</FormLabel>
              <Input
                id='nombre'
                type='text'
                name='nombre'
                placeholder='Ejemplo: Tareas de la semana' 
                value={ formState.nombre as string }
                onChange={ onInputChange }
              />
              <FormErrorMessage>Este campo es requerido</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={ error.descripcion }>
              <FormLabel htmlFor='descripcion'>Descripción de la tabla</FormLabel>
              <Textarea
                id='descripcion'
                name='descripcion'
                placeholder='Añade una breve descripción de la tabla' 
                value={ formState.descripcion as string }
                onChange={ onInputChange }
                />
              <FormErrorMessage>Este campo es requerido</FormErrorMessage>

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={ 3 } onClick={ handleClose }>
              Cancelar
            </Button>
            <Button colorScheme='blue' onClick={ handleSubmit }>Crear</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTableModal