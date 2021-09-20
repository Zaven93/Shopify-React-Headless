import { useContext } from 'react';
import {
  Grid,
  Text,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Link,
  Box,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { ShopContext } from '../context/shopContext';

const Cart = () => {
  const { isCartOpen, closeCart, checkout, removeLineItem } =
    useContext(ShopContext);
  return (
    <Drawer isOpen={isCartOpen} placement='right' onClose={closeCart} size='sm'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>

        <DrawerBody>
          {checkout.lineItems?.length > 0 ? (
            checkout.lineItems.map((item) => (
              <Grid templateColumns='repeat(4, 1fr )' gap={1} key={item.id}>
                <Flex alignItems='center' justifyContent='center'>
                  <CloseIcon
                    cursor='pointer'
                    onClick={() => removeLineItem(item.id)}
                  />
                </Flex>
                <Flex alignItems='center' justifyContent='center'>
                  <Image src={item.variant.image.src} />
                </Flex>
                <Flex alignItems='center' justifyContent='center'>
                  <Text>{item.title}</Text>
                </Flex>
                <Flex alignItems='center' justifyContent='center'>
                  <Text>{item.variant.price}</Text>
                </Flex>
              </Grid>
            ))
          ) : (
            <Box w='100%' h='100%'>
              <Text
                h='100%'
                display='flex'
                flexDir='column'
                alignItems='center'
                justifyContent='center'
              >
                Your Cart is empty!
              </Text>
            </Box>
          )}
        </DrawerBody>

        {checkout.lineItems?.length ? (
          <DrawerFooter>
            <Button w='100%'>
              <Link w='100%' href={checkout.webUrl}>
                Checkout
              </Link>
            </Button>
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
