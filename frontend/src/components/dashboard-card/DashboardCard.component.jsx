import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Box } from '@material-ui/core';
import useStyles from './DashboardCard.styles';

const DashboardCard = ({ order }) => {
  const classes = useStyles();
  return (
    <Link to={`/order/${order?._id}`}>
      <Card className={classes.card}>
        <Box display="flex" justifyContent="left">
          <img
            alt="order-image"
            className={classes.orderImage}
            src="https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321331/stir-fried-tofu-in-a-bowl-which-is-part-of-the-soft-food-diet.jpg"
          />
          <div className={classes.orderDetails}>
            <Typography variant="h6" color="primary">
              Order {order._id}
            </Typography>
            <Typography color="textSecondary">
              by Chef {order.chef.name}
            </Typography>
          </div>
        </Box>
        <Box display="flex" justifyContent="space-between" ml={2} mr={2}>
          <div className={classes.price}>
            <Typography variant="h6" className={classes.header}>
              Total Price
            </Typography>
            <Typography color="textSecondary">₹ {order.totalPrice}</Typography>
          </div>
          <div>
            <Typography variant="h6" className={classes.header}>
              Order Status
            </Typography>
            <Typography color="textSecondary">
              {order.underConfirmation
                ? 'Yet to Confirm'
                : order.isConfirmed
                ? 'Confirmed'
                : 'Rejected'}
            </Typography>
          </div>
        </Box>
        <Box ml={2} mt={3} mb={3}>
          <Typography variant="h6" className={classes.header}>
            Contents
          </Typography>
          {order.foodItems.map((item) => (
            <Typography color="textSecondary">
              {item.quantity} x {item.food.foodName} - ₹ {item.price}
            </Typography>
          ))}
        </Box>
      </Card>
    </Link>
  );
};

export default DashboardCard;
