import React from "react";
import { Card, Grid, Typography, Box } from "@material-ui/core";
import TodaysOrder from "../../assets/today-orders.svg";
import UntrackedOrder from "../../assets/untracted-order.svg";
import AllCheckOrder from "../../assets/all-check-order.svg";
import Orders from "../../assets/all-order.svg";
import useStyles from "./ChefLanding.styles";

const ChefLanding = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={TodaysOrder} />
            <Typography className={classes.heading}>
              Today's total orders
            </Typography>
            <Typography className={classes.number} variant="h4">
              30
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={UntrackedOrder} />
            <Typography className={classes.heading}>
              All checked orders
            </Typography>
            <Typography className={classes.number} variant="h4">
              25
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={AllCheckOrder} />
            <Typography className={classes.heading}>
              Untracted Orders
            </Typography>
            <Typography className={classes.number} variant="h4">
              5
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={Orders} />
            <Typography className={classes.heading}>Total orders</Typography>
            <Typography className={classes.number} variant="h4">
              600
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChefLanding;
