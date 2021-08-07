import React from 'react';
import { render } from '@testing-library/react';
import Form from '../Form';
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
} from '@chakra-ui/react';

const initialData = {
  oldPass: '',
  newPass: '',
  confirmPass: '',
};

test('Form should render correctly', () => {
  const { container } = render(<Form />);

  expect(container.firstChild).toMatchSnapshot();
});
