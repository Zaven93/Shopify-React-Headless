import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import ShopProvider from './context/shopContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
