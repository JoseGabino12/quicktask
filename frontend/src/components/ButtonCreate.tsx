import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import type { ButtonCreateProps } from '../interface/intrefaces'

export const ButtonCreate = ({ onClick, title }: ButtonCreateProps) => {
  return (
    <Button
      onClick={ onClick }
      leftIcon={ <AddIcon /> }
      as={ 'a' }
      fontSize={ 'sm' }
      fontWeight={ 600 }
      color={ 'white' }
      bg={ 'blue.400' }
      _hover={ {
        bg: 'blue.600',
      } }
    >
      { title }
    </Button>
  )
}