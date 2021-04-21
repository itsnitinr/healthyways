import React, {useEffect} from "react";
import {useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import DashboardCard from "../../components/dashboard-card/DashboardCard.component";
import useStyles from "./UserDashboard.styles";

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
      <Box className={classes.userDetailsDiv}>
        <Box className={classes.userDetails}>
          <div className={classes.name}>
            <Typography variant="h4" >{user?.name}</Typography>
            <Typography>{user?.location?.formattedAddress}, {user?.pincode}</Typography>
          </div>
          <div className={classes.date}>
            <Typography variant="h4">Role: {user?.isChef ? "Chef":"User"}</Typography>
            <Typography>User since {user?.createdAt.substring(0,10)}</Typography>
          </div>
        </Box>
      </Box>
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
