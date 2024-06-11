import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorMode,
  useDisclosure,
  Link as ChakraLink
} from '@chakra-ui/react'

import { Link as ReactRouterLink } from 'react-router-dom'

import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode } = useColorMode()

  return (
    <Box>
      <Flex
        bg={ colorMode === 'light' ? 'white' : 'gray.800' }
        color={ colorMode === 'light' ? 'gray.600' : 'white' }
        minH={ '60px' }
        py={ { base: 2 } }
        px={ { base: 4 } }
        borderBottom={ 1 }
        borderStyle={ 'solid' }
        borderColor={ colorMode === 'light' ? 'gray.200' : 'gray.900' }
        align={ 'center' }
        position={'fixed'}
        width={'100%'}
        zIndex={ 100 }
        top={ 0 }
      >
        <Flex
          flex={ { base: 1, md: 'auto' } }
          ml={ { base: -2 } }
          display={ { base: 'flex', md: 'none' } }>
          <IconButton
            onClick={ onToggle }
            icon={ isOpen ? <CloseIcon w={ 3 } h={ 3 } /> : <HamburgerIcon w={ 5 } h={ 5 } /> }
            variant={ 'ghost' }
            aria-label={ 'Toggle Navigation' }
          />
        </Flex>
        <Flex flex={ { base: 1 } } justify={ { base: 'center', md: 'start' } }>
          <ChakraLink
            as={ ReactRouterLink }
            to='/'
            textAlign={ { base: 'center', sm: 'left' } }
            fontFamily={ 'heading' }
            _hover={ { textDecoration: 'none' } }
            color={ colorMode === 'light' ? 'gray.800' : 'white' }>
            QuickTask
          </ChakraLink>


          <Flex display={ { base: 'none', md: 'flex' } } ml={ 10 }>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={ { base: 1, md: 0 } }
          justify={ 'flex-end' }
          direction={ 'row' }
          spacing={ 6 }>
          <Button as={ 'a' } fontSize={ 'sm' } fontWeight={ 600 } variant={ 'link' } href={ '/tables' }>
            Sign In
          </Button>
          <Button
            as={ 'a' }
            display={ { base: 'none', md: 'inline-flex' } }
            fontSize={ 'sm' }
            fontWeight={ 600 }
            color={ 'white' }
            bg={ 'blue.400' }
            href={ '/tables' }
            _hover={ {
              bg: 'blue.500',
            } }>
            Sign Up
          </Button>
        </Stack>
      </Flex>

       <Box mt="60px"> {/* Ajusta esto según la altura de tu nav */}
        <Collapse in={ isOpen } animateOpacity style={{ zIndex: isOpen ? 99 : 0 }}>
          <MobileNav />
        </Collapse>
      </Box>
    </Box>
  )
}

export default NavBar