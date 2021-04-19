import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { AiOutlineStar } from 'react-icons/ai';
import useStyles from './FoodCard.styles';

const FoodCard = ({ food }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <img alt="food_img" src={food.image} className={classes.img} />
      <Button className={classes.button} variant="contained">
        Add
      </Button>

      <Box display="flex" mt={2} justifyContent="space-between">
        <Typography variant="h6" className={classes.foodName}>
          {food.foodName}
        </Typography>
        <Typography variant="h6" className={classes.price}>
          ₹ {food.price}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography color="textSecondary">by Chef {food.chef.name}</Typography>
        <Box display="flex" alignItems="center">
          <AiOutlineStar className={classes.star} />
          <Typography color="textSecondary" className={classes.rating}>
            {' '}
            4.5
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
export default FoodCard;
