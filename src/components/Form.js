import React, { useEffect, useState } from 'react';
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

const Form = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [btnDisabled, toggleBtnDisabled] = useState(true);
  const [btnIsLoading, toggleBtnIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    validate();

    if (data.newPass && data.confirmPass && data.newPass === data.confirmPass) {
      toggleBtnDisabled(false);
    } else {
      toggleBtnDisabled(true);
    }
  }, [data]);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const valid = validate(true);

    if (valid) {
      toggleBtnIsLoading(true);

      setTimeout(() => {
        toggleBtnIsLoading(false);

        toast({
          title: 'Password is changed',
          description: 'You can use new password for the log in',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        setData(initialData);
      }, 1000);
    }
  };

  const validate = (submit = false) => {
    let errors = {};
    if (data.newPass) {
      if (data.newPass.length < 8) {
        errors.newPass = 'The password is too short';
      } else if (
        data.newPass.replace(/\D/g, '').length === 0 ||
        data.newPass.replace(/[^A-Za-z]/g, '').length === 0
      ) {
        errors.newPass =
          'The password must contain the both of letters and digits';
      }
    }

    if (data.newPass && data.confirmPass && data.newPass !== data.confirmPass) {
      errors.newPass = 'The password and confirm password fields do not match';
      errors.confirmPass =
        'The password and confirm password fields do not match';
    }

    if (submit) {
      Object.keys(data).forEach(field => {
        if (!data[field]) {
          errors[field] = 'The field cannot be blank';
        }
      });
    }

    setErrors(errors);

    return !Object.keys(errors).length;
  };

  return (
    <Flex
      as="form"
      w="100%"
      maxW="600px"
      direction="column"
      onSubmit={handleSubmit}
    >
      <FormControl id="oldPass" mb={5} isInvalid={errors.oldPass}>
        <FormLabel>Old password</FormLabel>
        <Input
          type="password"
          name="oldPass"
          size="lg"
          value={data.oldPass}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.oldPass}</FormErrorMessage>
      </FormControl>
      <FormControl id="newPass" mb={5} isInvalid={errors.newPass}>
        <FormLabel>New password</FormLabel>
        <Input
          type="password"
          name="newPass"
          size="lg"
          value={data.newPass}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.newPass}</FormErrorMessage>
      </FormControl>
      <FormControl id="confirmPass" mb={5} isInvalid={errors.confirmPass}>
        <FormLabel>Confirm new password</FormLabel>
        <Input
          type="password"
          name="confirmPass"
          size="lg"
          value={data.confirmPass}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.confirmPass}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        size="lg"
        isDisabled={btnDisabled}
        isLoading={btnIsLoading}
      >
        Save changes
      </Button>
    </Flex>
  );
};

export default Form;
