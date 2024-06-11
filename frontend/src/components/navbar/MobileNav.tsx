import { 
  Box, 
  Collapse, 
  Icon, 
  Stack, 
  Text, 
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { NavItem } from '../../interface/intrefaces'
import { NAV_ITEMS } from '../../data/data'


const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode } = useColorMode()

  return (
    <Stack spacing={ 4 } onClick={ children && onToggle }>
      <Box
        py={ 2 }
        as="a"
        href={ href ?? '#' }
        justifyContent="space-between"
        alignItems="center"
        _hover={ {
          textDecoration: 'none',
        } }>
        <Text fontWeight={ 600 } color={ colorMode === 'light' ? 'gray.600' : 'gray.200' }>
          { label }
        </Text>
        { children && (
          <Icon
            as={ ChevronDownIcon }
            transition={ 'all .25s ease-in-out' }
            transform={ isOpen ? 'rotate(180deg)' : '' }
            w={ 6 }
            h={ 6 }
          />
        ) }
      </Box>

      <Collapse in={ isOpen } animateOpacity style={ { marginTop: '0!important' } }>
        <Stack
          mt={ 2 }
          pl={ 4 }
          borderLeft={ 1 }
          borderStyle={ 'solid' }
          borderColor={ colorMode === 'light' ? 'gray.200' : 'gray.700' }
          align={ 'start' }>
          { children &&
            children.map((child) => (
              <Box as="a" key={ child.label } py={ 2 } href={ child.href }>
                { child.label }
              </Box>
            )) }
        </Stack>
      </Collapse>
    </Stack>
  )
}

const MobileNav = () => {
  const { colorMode } = useColorMode()

  return (
    <Stack bg={ colorMode === 'light' ? 'white' : 'gray.800' }p={ 4 } display={ { md: 'none' } }>
      { NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={ navItem.label } { ...navItem } />
      )) }
    </Stack>
  )
}

export default MobileNav