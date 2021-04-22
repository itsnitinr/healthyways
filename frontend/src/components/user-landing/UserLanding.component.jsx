import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";
import useStyles from "./UserLanding.styles";

const UserLanding = () => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userLogin);

  return (
    <>
      <Box className={classes.userDetailsDiv}>
        <Box className={classes.userDetails}>
          <div className={classes.name}>
            <Typography variant="h4">{user?.name}</Typography>
            <Typography>
              {user?.location?.formattedAddress}, {user?.pincode}
            </Typography>
          </div>
          <div className={classes.date}>
            <Typography variant="h4">
              Role: {user?.isChef ? "Chef" : "User"}
            </Typography>
            <Typography>
              User since {user?.createdAt.substring(0, 10)}
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default UserLanding;
