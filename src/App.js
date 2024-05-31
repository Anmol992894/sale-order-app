// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, color, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './components/Login';
import SaleOrderPage from './components/SaleOrder';
import { NavbarBrand } from 'react-bootstrap';

const queryClient = new QueryClient();

const config = {
  initialColorMode: 'black',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors:{
    brand:{
      100: "#f7fafc",
      900:"#ffffff"
    }
  }
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/orders" element={isAuthenticated ? <SaleOrderPage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
