import Head from "next/head"
import{
    Box,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue
} from "@chakra-ui/react"

const Layout = () => {
  return (
    <div>
      <Head>
        <title>Basquetball League</title>
      </Head>
            
      <Box>
      {/* Box es como un Div en Chakra-UI */}   
        <Flex        
      bg={useColorModeValue('gray.300', 'gray.600')}
      minH={'60px'}
      py={{base: 2}}
      px={{base: 2}}
      borderTop={1}
      borderBottom={1}
      borderStartStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}
        >
          <Flex
          flex={{base: 1}}
          justify={{base: 'center', md: 'start'}}          
          >
            <Text
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}              
            >Logo</Text>
          </Flex>
          <Stack
          flex={{base: 1}}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          >
            <Button
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
            >Sign in</Button>
            <Button
            fontSize={'md'}
            fontWeight={600}
            color={'white'}
            variant={'link'}
            href={'#'}
            bg={'blue.400'}
            _hover={{ bg: 'blue.300'}}
            >Sign up</Button>            
          </Stack>
        </Flex>
      </Box>        
    </div>
  )
}
export default Layout