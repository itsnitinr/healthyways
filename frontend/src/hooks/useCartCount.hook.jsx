import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useCartCount = () => {
  const [cartCount, setCartCount] = useState(0);

  const cartLength = useSelector((state) => state.cart.cartItems).length || '';

  useEffect(() => {
    setCartCount(cartLength);
  }, []);

  return cartCount;
};

export default useCartCount;
