import { useContext } from 'react';
import { Flex, Icon, Image, Badge, Box } from '@chakra-ui/react';
import { MdMenu, MdShoppingBasket } from 'react-icons/md';

import { ShopContext } from '../context/shopContext';

const NavBar = () => {
  const { openCart, openMenu, checkout } = useContext(ShopContext);

  return (
    <Flex
      backgroundColor='#FFA8E2'
      flexDir='row'
      justifyContent='space-between'
      alignItems='center'
      p='2rem'
    >
      <Icon
        cursor='pointer'
        fill='white'
        as={MdMenu}
        w={30}
        h={30}
        onClick={openMenu}
      />
      <Image
        src='https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540'
        w={100}
        h={100}
      />
      <Box>
        <Icon
          cursor='pointer'
          fill='white'
          as={MdShoppingBasket}
          w={30}
          h={30}
          onClick={openCart}
        />
        <Badge backgroundColor='#FF38BD' borderRadius='50%'>
          {checkout.lineItems?.length}
        </Badge>
      </Box>
    </Flex>
  );
};

export default NavBar;
