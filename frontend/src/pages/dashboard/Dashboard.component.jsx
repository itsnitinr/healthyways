import React, {useEffect} from "react";
import {useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {  Grid, Typography } from "@material-ui/core";
import DashboardCard from "../../components/dashboard-card/DashboardCard.component";
import UserLanding from "../../components/user-landing/UserLanding.component";
import ChefLanding from "../../components/chef-landing/ChefLanding.component";
import useStyles from "./Dashboard.styles";

const UserDashboard = ({history}) => {
  const classes = useStyles();

  const {user} = useSelector((state)=>state.userLogin);

  useEffect(() => {
    if(!user){
      history.push("/signin");
    }

  }, [history, user])
  return (
    <div className={classes.root}>
     {user?.isChef ? <ChefLanding/>: <UserLanding/>}
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
        <Grid md={9} item className={classes.cardsDiv}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <DashboardCard />
            </Grid>
            <Grid item md={6}>
              <DashboardCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboard;
