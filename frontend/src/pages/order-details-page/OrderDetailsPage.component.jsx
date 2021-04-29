import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Container,
  Typography,
  LinearProgress,
  Button,
  Card,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core';
import { MdCheck, MdClear, MdCloudDownload } from 'react-icons/md';

import {
  getOrderDetails,
  reviewOrder,
  payOrder,
  dispatchOrder,
} from '../../redux/order/order.actions';

import {
  ORDER_PAY_RESET,
  ORDER_DISPATCH_RESET,
} from '../../redux/order/order.types';

import useStyles from './OrderDetailsPage.styles';

function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

const OrderDetailsPage = ({ history }) => {
  const orderId = useParams().id;

  const { user } = useSelector((state) => state.userLogin);
  const { order, loading } = useSelector((state) => state.orderDetails);
  const { success } = useSelector((state) => state.orderPay);
  const { success: dispatchSuccess } = useSelector(
    (state) => state.orderDispatch
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    } else {
      if (success) {
        dispatch({ type: ORDER_PAY_RESET });
      }
      if (dispatchSuccess) {
        dispatch({ type: ORDER_DISPATCH_RESET });
      }
      dispatch(getOrderDetails(orderId));
      if (
        order.user &&
        order.chef &&
        order.user._id !== user._id &&
        order.chef._id !== user._id
      ) {
        console.log(order.user._id, user._id);
        history.push('/');
      }
    }
  }, [
    dispatch,
    order.orderPrice,
    order.chef && order.chef._id,
    order.user && order.user._id,
    orderId,
    user,
    history,
    success,
    dispatchSuccess,
  ]);

  const classes = useStyles();

  async function displayRazorpay() {
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      currency: 'INR',
      name: 'HealthyWays Meals',
      description: 'Order Payment',
      image: '',
      order_id: `${order.razorpayOrderId}`,
      handler: function (response) {
        dispatch(
          payOrder(
            orderId,
            response.razorpay_payment_id,
            response.razorpay_signature
          )
        );
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const onDispatchSubmit = (e) => {
    e.preventDefault();
    dispatch(dispatchOrder(orderId));
  };

  return (
    <>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <Container style={{ marginTop: '2rem' }}>
          <Grid container>
            <Grid item sm={8} xs={12}>
              <Typography className={classes.heading} variant="h5" gutterBottom>
                User Details
              </Typography>
              <TableContainer
                component={Card}
                className={classes.tableContainer}
              >
                <Table>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email Address</TableCell>
                    <TableCell>{order.user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>{order.user.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chef Phone Number</TableCell>
                    <TableCell>{order.chef.phoneNumber}</TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <Typography className={classes.heading} variant="h5" gutterBottom>
                Order Details
              </Typography>
              <Table className={classes.tableContainer}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <b>Food Item</b>
                    </TableCell>
                    <TableCell>
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell>
                      <b>Price</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order &&
                    order.foodItems.map((item) => (
                      <TableRow>
                        <TableCell>
                          <img
                            src={item.food.image}
                            alt={item.food.foodName}
                            style={{ maxHeight: 100, width: 'auto' }}
                          />
                        </TableCell>
                        <TableCell>{item.food.foodName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹ {item.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Typography className={classes.heading} variant="h5" gutterBottom>
                Order Tracking
              </Typography>
              <TableContainer
                component={Card}
                style={{ marginBottom: '1.5rem' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Detail</b>
                      </TableCell>
                      <TableCell>
                        <b>Status</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell scope="row">Review</TableCell>
                      <TableCell>
                        {order.underConfirmation
                          ? 'Yet to confirm'
                          : order.isConfirmed
                          ? 'Confirmed'
                          : 'Rejected'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">Paid</TableCell>
                      <TableCell>
                        {order.isPaid || success ? (
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <MdCheck className={classes.checkIcon} />
                            {order.paidAt && order.paidAt.substring(0, 10)}
                          </div>
                        ) : (
                          <MdClear className={classes.clearIcon} />
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">Ready</TableCell>
                      <TableCell>
                        {order.isReady ? (
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <MdCheck className={classes.checkIcon} />
                            {order.readyAt && order.readyAt.substring(0, 10)}
                          </div>
                        ) : (
                          <MdClear className={classes.clearIcon} />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {user &&
                user.isChef &&
                !order.isPaid &&
                order.underConfirmation ? (
                  <>
                    <Button
                      style={{
                        width: '50%',
                        borderRadius: 0,
                        background: '#4caf50',
                      }}
                      variant="contained"
                      onClick={() => dispatch(reviewOrder(order._id, true))}
                    >
                      Approve
                    </Button>
                    <Button
                      style={{
                        width: '50%',
                        background: '#f44336',
                        color: 'white',
                        borderRadius: 0,
                      }}
                      variant="contained"
                      onClick={() => dispatch(reviewOrder(order._id, false))}
                    >
                      Reject
                    </Button>
                  </>
                ) : user &&
                  user.isChef &&
                  order.isConfirmed &&
                  order.isPaid &&
                  !order.isReady ? (
                  <form onSubmit={onDispatchSubmit}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      fullWidth
                      required
                    >
                      Mark as Ready
                    </Button>
                  </form>
                ) : (
                  user &&
                  !user.isChef &&
                  !order.isPaid && (
                    <Button
                      disabled={order.underConfirmation || !order.isConfirmed}
                      variant="contained"
                      color="primary"
                      onClick={displayRazorpay}
                      fullWidth
                    >
                      Pay
                    </Button>
                  )
                )}
              </TableContainer>
              <Typography className={classes.heading} variant="h5" gutterBottom>
                Cost Breakdown
              </Typography>
              <TableContainer
                style={{ marginBottom: '1.5rem' }}
                component={Card}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Cost Type</b>
                      </TableCell>
                      <TableCell>
                        <b>Price</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell scope="row">Order Price</TableCell>
                      <TableCell>₹ {order.orderPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">Tax Price</TableCell>
                      <TableCell>₹ {order.taxPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">
                        <b>Total Price</b>
                      </TableCell>
                      <TableCell>
                        <b>₹ {order.totalPrice}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default OrderDetailsPage;
