// src/components/EditSaleOrderModal.js
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditSaleOrderModal = ({ order, onClose, updateOrder }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: order,
  });
  const date = watch('invoice_date');

  const onSubmit = (data) => {
    const updatedOrder = { ...data, id: order.id, paid: order.paid };
    updateOrder(updatedOrder);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="4" isInvalid={errors.customer_id}>
              <FormLabel>Customer</FormLabel>
              <Input type="number" {...register('customer_id', { required: 'Customer is required' })} readOnly />
            </FormControl>
            <FormControl mb="4" isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <DatePicker
                selected={date}
                onChange={(date) => setValue('invoice_date', date)}
                dateFormat="MM/dd/yyyy"
                {...register('invoice_date', { required: 'Invoice date is required' })}
                readOnly={order.readOnly}
              />
            </FormControl>
            <FormControl mb="4" isInvalid={errors.price}>
              <FormLabel>Price</FormLabel>
              <Input type="number" {...register('price', { required: 'Price is required' })} readOnly={order.readOnly} />
            </FormControl>
            {!order.readOnly && (
              <Button type="submit" colorScheme="blue" mt="4">Update</Button>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditSaleOrderModal;
