import React from 'react';
import { ChakraProvider, theme, Box, Heading, VStack } from '@chakra-ui/react';
import Form from './Form';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box py="80px">
        <VStack direction="column" align="center">
          <Heading as="h1" textTransform="uppercase" mb={4}>
            Create Your New Password
          </Heading>
          <Form />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
