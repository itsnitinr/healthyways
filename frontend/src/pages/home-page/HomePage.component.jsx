import React, { useState } from 'react';
import useStyles from './HomePage.styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import FoodCard from '../../components/foodcard/Foodcard.component';

const HomePage = () => {
  const classes = useStyles();

  const [search, setSearch] = useState('');

  return (
    <>
      <div className={classes.heroSection}>
        <Typography className={classes.heroHeader}>
          Get healthy food at your
          <span className={classes.highlightColor}> footsteps in 30 mins </span>
          just like home made food
        </Typography>
        <div className={classes.searchform}>
          <input
            type="text"
            className={classes.searchbox}
            placeholder="Enter your location"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={classes.searchButton}>Search</button>
        </div>
        <p className={classes.advancedSearch}>Advanced Search</p>
      </div>
      <div>
        {/* <Grid container justify="center" spacing={1}>
          <Grid item sm={3} xs={12}>
            <FoodCard />
          </Grid>
          <Grid item sm={3} xs={12}>
            <FoodCard />
          </Grid>
          <Grid item sm={3} xs={12}>
            <FoodCard />
          </Grid>
          <Grid item sm={3} xs={12}>
            <FoodCard />
          </Grid>
        </Grid> */}
      </div>
    </>
  );
};

export default HomePage;
