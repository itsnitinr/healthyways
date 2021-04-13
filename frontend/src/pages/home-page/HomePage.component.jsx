import React, { useState } from 'react';
import useStyles from './HomePage.styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FoodCard from '../../components/foodcard/FoodCard.component';

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
      <Container>
        <Grid container spacing={5} className={classes.grid} justify="space-between">
          <Grid item md={3} sm={4}  xs={12}>
            <FoodCard/>
          </Grid>
          <Grid item sm={4} md={3} xs={12}>
            <FoodCard/>
          </Grid>
          <Grid item sm={4} md={3} xs={12}>
            <FoodCard/>
          </Grid>
          <Grid item sm={4} md={3} xs={12}>
            <FoodCard/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
