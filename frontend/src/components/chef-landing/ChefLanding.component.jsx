import React from "react";
import { Card, Grid, Typography, Box } from "@material-ui/core";
import TodaysOrder from "../../assets/today-orders.svg";
import UntrackedOrder from "../../assets/untracted-order.svg";
import AllCheckOrder from "../../assets/all-check-order.svg";
import Orders from "../../assets/all-order.svg";
import useStyles from "./ChefLanding.styles";

const ChefLanding = ({ orders }) => {
  const classes = useStyles();

  const d = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={TodaysOrder} />
            <Typography className={classes.heading}>Today's orders</Typography>
            <Typography className={classes.number} variant="h4">
              {orders &&
                orders.filter(
                  (order) =>
                    order.createdAt
                      .replace(/T.*/, "")
                      .split("-")
                      .reverse()
                      .join("-") === d
                ).length}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={UntrackedOrder} />
            <Typography className={classes.heading}>
              Orders to Confirm
            </Typography>
            <Typography className={classes.number} variant="h4">
              {orders &&
                orders.filter((order) => order.underConfirmation).length}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={AllCheckOrder} />
            <Typography className={classes.heading}>
              Confirmed Orders
            </Typography>
            <Typography className={classes.number} variant="h4">
              {orders && orders.filter((order) => order.isConfirmed).length}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card className={classes.card}>
            <img src={Orders} />
            <Typography className={classes.heading}>Total orders</Typography>
            <Typography className={classes.number} variant="h4">
              {orders?.length}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChefLanding;
