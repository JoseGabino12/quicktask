import { Heading, Flex, Grid } from '@chakra-ui/react'

const Home = () => {
  return (
    <>
      <Grid className='absolute-container' height='100vh'>
        <Flex className='absolute-content' />
        <Flex height='100%' zIndex={1} marginTop={5}>
          <Heading fontSize='4xl' >QuickTask unifica tus tareas, compañeros de equipo y herramientas</Heading>
        </Flex>
      </Grid>
    </>
  )
}

export default Home
