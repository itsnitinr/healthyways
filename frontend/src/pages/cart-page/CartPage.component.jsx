import React, { useEffect } from 'react';
import {
  Container,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Box,
  Button,
  Grid,
  Card,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { GrAdd, GrSubtract } from 'react-icons/gr';
import { ImCross } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './CartPage.styles';
import {
  AddToCart,
  removeFromCart,
  clearItemFromCart,
} from '../../redux/cart/cart.actions';
import { getCartTotal } from '../../redux/cart/cart.utils';
import { placeOrder } from '../../redux/order/order.actions';

const CartPage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userLogin);
  const { loading, order, success } = useSelector((state) => state.orderCreate);

  const orderPrice = parseInt(getCartTotal(cartItems));
  const taxPrice = parseFloat((orderPrice * 0.18).toFixed(2));

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
    if (success) {
      history.push('/dashboard');
    }
  }, [history, user, success, order?._id]);

  const handlePlaceOrder = () => {
    const itemOneChef = cartItems[0].chef._id;
    const sameChefArray = cartItems.filter(
      (item) => item.chef._id === itemOneChef
    );
    if (sameChefArray.length !== cartItems.length)
      return alert('Please ensure all food items are from the same chef.');
    const orderDetails = {
      chef: itemOneChef,
      foodItems: cartItems.map((item) => ({
        food: item._id,
        quantity: item.quantity,
        price: item.quantity * item.price,
      })),
      orderPrice,
      taxPrice,
      totalPrice: orderPrice + taxPrice,
    };
    dispatch(placeOrder(orderDetails));
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <Container>
        {cartItems.length === 0 ? (
          <Box mt={3} mb={3}>
            <Typography variant="h3">Cart is empty</Typography>
          </Box>
        ) : (
          <>
            <Grid spacing={3} container>
              <Grid item md={9}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tablecell}>
                          Image
                        </TableCell>
                        <TableCell className={classes.tablecell}>
                          Food Name
                        </TableCell>
                        <TableCell className={classes.tablecell}>
                          Quantity
                        </TableCell>
                        <TableCell className={classes.tablecell}>
                          Price
                        </TableCell>
                        <TableCell className={classes.tablecell}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <img
                              className={classes.foodImage}
                              src={item.image}
                              alt={item.foodName}
                            />
                          </TableCell>
                          <TableCell>{item.foodName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₹{item.price * item.quantity}</TableCell>
                          <TableCell>
                            <Box>
                              <button
                                className={classes.add}
                                variant="contained"
                                color="primary"
                                onClick={() => dispatch(AddToCart(item))}
                              >
                                <GrAdd className={classes.icon} />
                              </button>
                              <button
                                className={classes.subtract}
                                variant="contained"
                                color="primary"
                                onClick={() => dispatch(removeFromCart(item))}
                              >
                                <GrSubtract className={classes.icon} />
                              </button>
                              <button
                                className={classes.remove}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  dispatch(clearItemFromCart(item?._id))
                                }
                              >
                                <ImCross />
                              </button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item md={3}>
                <Card className={classes.card}>
                  <Box className={classes.chefInfo}>
                    <Typography variant="h6">Ready to</Typography>
                    <Typography variant="h5" color="primary">
                      PLACE ORDER?
                    </Typography>
                  </Box>
                  <div>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mt={2}
                      ml={2}
                      mr={2}
                    >
                      <Typography variant="h6">Order Price</Typography>
                      <Typography variant="h6" color="primary">
                        ₹{orderPrice}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mt={2}
                      ml={2}
                      mr={2}
                    >
                      <Typography variant="h6">Tax Price </Typography>
                      <Typography variant="h6" color="primary">
                        ₹{taxPrice}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mt={2}
                      ml={2}
                      mr={2}
                    >
                      <Typography variant="h6">Total Price</Typography>
                      <Typography variant="h6" color="primary">
                        ₹{(orderPrice + taxPrice).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box justifyContent="center" mt={2}>
                      <Button
                        display="block"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    </Box>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
