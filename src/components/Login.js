// src/components/LoginPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel, Heading } from '@chakra-ui/react';

const LoginPage = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.username === 'admin' && data.password === 'password') {
      onLogin();
      navigate('/orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading mb="6">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register('username')} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
