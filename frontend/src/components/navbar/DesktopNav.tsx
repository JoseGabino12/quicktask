import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  useColorMode,
  Text,
  Flex,
  Icon
} from '@chakra-ui/react'

import { NAV_ITEMS } from '../../data/data'
import { type NavItem } from '../../interface/intrefaces'

import { ChevronRightIcon } from '@chakra-ui/icons'

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      as="a"
      href={ href }
      role={ 'group' }
      display={ 'block' }
      p={ 2 }
      rounded={ 'md' }
      _hover={ { bg: colorMode === 'light' ? 'pink.50' : 'gray.900' } }>
      <Stack direction={ 'row' } align={ 'center' }>
        <Box>
          <Text
            transition={ 'all .3s ease' }
            _groupHover={ { color: 'pink.400' } }
            fontWeight={ 500 }>
            { label }
          </Text>
          <Text fontSize={ 'sm' }>{ subLabel }</Text>
        </Box>
        <Flex
          transition={ 'all .3s ease' }
          transform={ 'translateX(-10px)' }
          opacity={ 0 }
          _groupHover={ { opacity: '100%', transform: 'translateX(0)' } }
          justify={ 'flex-end' }
          align={ 'center' }
          flex={ 1 }>
          <Icon color={ 'pink.400' } w={ 5 } h={ 5 } as={ ChevronRightIcon } />
        </Flex>
      </Stack>
    </Box>
  )
}

const DesktopNav = () => {
  const { colorMode } = useColorMode()

  const linkColor = colorMode === 'light' ? 'gray.600' : 'gray.200'
  const linkHoverColor = colorMode === 'light' ? 'gray.800' : 'white'
  const popoverContentBgColor = colorMode === 'light' ? 'white' : 'gray.800'

  return (
    <Stack direction={ 'row' } spacing={ 4 }>
      { NAV_ITEMS.map((navItem) => (
        <Box key={ navItem.label }>
          <Popover trigger={ 'hover' } placement={ 'bottom-start' }>
            <PopoverTrigger>
              <Box
                as="a"
                p={ 2 }
                href={ navItem.href ?? '#' }
                fontSize={ 'sm' }
                fontWeight={ 500 }
                color={ linkColor }
                _hover={ {
                  textDecoration: 'none',
                  color: linkHoverColor,
                } }>
                { navItem.label }
              </Box>
            </PopoverTrigger>

            { navItem.children && (
              <PopoverContent
                border={ 0 }
                boxShadow={ 'xl' }
                bg={ popoverContentBgColor }
                p={ 4 }
                rounded={ 'xl' }
                minW={ 'sm' }>
                <Stack>
                  { navItem.children.map((child) => (
                    <DesktopSubNav key={ child.label } { ...child } />
                  )) }
                </Stack>
              </PopoverContent>
            ) }
          </Popover>
        </Box>
      )) }
    </Stack>
  )
}

export default DesktopNav