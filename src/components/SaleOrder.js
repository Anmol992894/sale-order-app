// src/components/SaleOrderPage.js
import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import SaleOrderModal from './SaleOrderModal';
import EditSaleOrderModal from './editsaleorder';
import { dataTagSymbol } from '@tanstack/react-query';

const SaleOrderPage = () => {
  const customers = [{
    "id": 9,
    "customer": 11908,
    "customer_profile": {
      "id": 11908,
      "name": "Ram",
      "color": [
        182,
        73,
        99
      ],
      "email": "jesus_christ@church.com",
      "pincode": "Mumbai",
      "location_name": "Mumbai, Maharashtra, India",
      "type": "C",
      "profile_pic": null,
      "gst": ""
    },
  },{
    "id": 10,
    "customer": 11909,
    "customer_profile": {
      "id": 11909,
      "name": "Shyam",
      "color": [
        182,
        73,
        99
      ],
      "email": "prometheus@church.com",
      "pincode": "Sweet Island",
      "location_name": "New World",
      "type": "C",
      "profile_pic": null,
      "gst": ""
    },
  }];
  const product = [{
    "id": 209,
    "display_id": 8,
    "owner": 1079,
    "name": "New Product",
    "category": "The god of War",
    "characteristics": "New Product Characteristics",
    "features": "",
    "brand": "New Product Brand",
    "sku": [
      {
        "id": 248,
        "selling_price": 54,
        "max_retail_price": 44,
        "amount": 33,
        "unit": "kg",
        "quantity_in_inventory": 0,
        "product": 209
      },
      {
        "id": 247,
        "selling_price": 32,
        "max_retail_price": 32,
        "amount": 33,
        "unit": "kg",
        "quantity_in_inventory": 0,
        "product": 209
      },
      {
        "id": 246,
        "selling_price": 23,
        "max_retail_price": 21,
        "amount": 22,
        "unit": "kg",
        "quantity_in_inventory": 1,
        "product": 209
      }
    ],
    "updated_on": "2024-05-24T12:46:41.995873Z",
    "adding_date": "2024-05-24T12:46:41.995828Z"
  }];
  const saleOrders = [{
    "customer_id": 11908,
    "items": [
      {
        "sku_id": 220,
        "price": 12,
        "quantity": 12
      }],
    "paid": false,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": "7/5/2024"
  },{
    "customer_id": 11909,
    "items": [
      {
        "sku_id": 246,
        "price": 20,
        "quantity": 12
      }],
    "paid": true,
    "invoice_no": "Invoice - 1212133",
    "invoice_date": "6/5/2024"
  }]
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editOrder, setEditOrder] = useState(null);
  const [customer,setCustomer]=useState(customers)
  const [orders, setOrders] = useState(saleOrders);

  // Read orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('saleOrders')) || [];
    setOrders(savedOrders);
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('saleOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (updatedOrder) => {
    setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
  };

  const openEditModal = (order) => {
    setEditOrder(order);
    onOpen();
  };

  return (
    <Box p="4">
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button colorScheme="blue" onClick={onOpen}>+ Sale Order</Button>
            <Box as="table" mt="4" width="full" textAlign="center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer_Name</th>
                  <th>Price</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    order.paid===false ?<tr key={order.customer_id}>
                      <td>{order.items[0].sku_id}</td>
                      <td>{customer.map((cust)=>{
                        return(
                          order.customer_id===cust.customer?
                           <span>{cust.customer_profile.name}</span>:""
                        )
                      })}</td>
                      <td>{order.items[0].price}</td>
                      <td>{product.map((date)=>{
                        return(
                          <span>{date.updated_on}</span>
                        )
                      })}</td>
                      <td>
                        <Button onClick={() => openEditModal(order)}>...</Button>
                      </td>
                    </tr>:""
                  )
                })}
              </tbody>
            </Box>
          </TabPanel>
          <TabPanel>
            <Button colorScheme="blue" onClick={onOpen}>+ Sale Order</Button>
            <Box as="table" mt="4" width="full" textAlign="center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer_Name</th>
                  <th>Price</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    order.paid===true ?<tr key={order.customer_id}>
                      <td>{order.items[0].sku_id}</td>
                      <td>{customer.map((cust)=>{
                        return(
                          order.customer_id===cust.customer?
                           <span>{cust.customer_profile.name}</span>:""
                        )
                      })}</td>
                      <td>{order.items[0].price}</td>
                      <td>{product.map((date)=>{
                        return(
                          <span>{date.updated_on}</span>
                        )
                      })}</td>
                      <td>
                        <Button onClick={() => openEditModal(order)}>...</Button>
                      </td>
                    </tr>:""
                  )
                })}
              </tbody>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {isOpen && (
        editOrder ? (
          <EditSaleOrderModal
            order={editOrder}
            onClose={() => { setEditOrder(null); onClose(); }}
            updateOrder={updateOrder}
          />
        ) : (
          <SaleOrderModal onClose={onClose} addOrder={addOrder} />
        )
      )}
    </Box>
  );
};

export default SaleOrderPage;
