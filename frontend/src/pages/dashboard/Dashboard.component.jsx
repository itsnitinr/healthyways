import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import DashboardCard from '../../components/dashboard-card/DashboardCard.component';
import UserLanding from '../../components/user-landing/UserLanding.component';
import ChefLanding from '../../components/chef-landing/ChefLanding.component';
import useStyles from './Dashboard.styles';
import { getMyOrders } from '../../redux/order/order.actions';

const UserDashboard = ({ history }) => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userLogin);
  const { orders, loading } = useSelector((state) => state.orderListMy);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    } else {
      dispatch(getMyOrders(user?.isChef ? 'chef' : 'user'));
    }
  }, [history, user, dispatch]);

  return (
    <div className={classes.root}>
      {user?.isChef ? (
        <ChefLanding orders={orders && orders} />
      ) : (
        <UserLanding />
      )}
      <Grid container>
        <Grid md={3} item className={classes.profileGrid}>
          <Typography className={classes.profileHeader} variant="h4">
            PROFILE
          </Typography>
          <div className={classes.profileLinkDiv}>
            <Link>
              <Typography className={classes.profileLink}>
                Edit Profile
              </Typography>
            </Link>
            <Link>
              <Typography className={classes.profileLink}>
                Update Password
              </Typography>
            </Link>
          </div>
          <Typography className={classes.profileHeader} variant="h4">
            ORDER HISTORY
          </Typography>
          <div className={classes.profileLinkDiv}>
            <Typography className={classes.profileLink}>All Orders</Typography>
          </div>
        </Grid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Grid md={9} item className={classes.cardsDiv}>
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid key={order._id} item md={6}>
                  <DashboardCard order={order} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default UserDashboard;
