import { useState, createContext, useEffect } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem('checkout_id', checkout.id);
    setCheckout(checkout);
  };

  const fetchCheckout = async (checkoutId) => {
    try {
      const checkout = await client.checkout.fetch(checkoutId);

      setCheckout(checkout);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    const checkoutItem = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    );
    setCheckout(checkoutItem);
    openCart();
  };

  const removeLineItem = async (lineItemIdsToRemove) => {
    try {
      const checkoutItem = await client.checkout.removeLineItems(
        checkout.id,
        lineItemIdsToRemove
      );
      setCheckout(checkoutItem);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const products = await client.product.fetchAll();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductWithHandle = async (handle) => {
    try {
      const product = await client.product.fetchByHandle(handle);
      setProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCart = () => setIsCartOpen(false);

  const openCart = () => setIsCartOpen(true);

  const closeMenu = () => setIsMenuOpen(false);

  const openMenu = () => setIsMenuOpen(true);

  useEffect(() => {
    if (localStorage.checkout_id) {
      fetchCheckout(localStorage.checkout_id);
    } else {
      createCheckout();
    }
  }, []);

  console.log('Checkout is', checkout);

  return (
    <ShopContext.Provider
      value={{
        product,
        products,
        checkout,
        isCartOpen,
        isMenuOpen,
        fetchAllProducts,
        fetchProductWithHandle,
        closeCart,
        openCart,
        closeMenu,
        openMenu,
        addItemToCheckout,
        removeLineItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
