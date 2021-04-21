import React from "react";
import { Card, Typography, Box } from "@material-ui/core";
import useStyles from "./DashboardCard.styles";

const DashboardCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Box display="flex" justifyContent="left">
        <img alt="order-image" className={classes.orderImage} src="https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321331/stir-fried-tofu-in-a-bowl-which-is-part-of-the-soft-food-diet.jpg" />
        <div className={classes.orderDetails}>
          <Typography variant="h5" color="primary">
            Order Id
          </Typography>
          <Typography color="textSecondary">by chef XYZ</Typography>
        </div>
      </Box>
      <Box display="flex" justifyContent="space-between" ml={2} mr={2}>
          <div className={classes.price}>
              <Typography variant="h5" className={classes.header}>Total Price</Typography>
              <Typography color="textSecondary">₹350</Typography>
          </div>
          <div>
              <Typography variant="h5" className={classes.header}>Order Status</Typography>
              <Typography color="textSecondary">Ready</Typography>
          </div>
      </Box>
      <Box ml={2} mt={3} mb={3}>
          <Typography variant="h5" className={classes.header}>Contents</Typography>
          <Typography color="textSecondary">Puri Sabzi - 30</Typography>
          <Typography color="textSecondary">Puri Sabzi - 30</Typography>
      </Box>
    </Card>
  );
};

export default DashboardCard;
