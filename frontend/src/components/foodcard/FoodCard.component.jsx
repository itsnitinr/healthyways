import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { AiOutlineStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./FoodCard.styles";
import { AddToCart } from "../../redux/cart/cart.actions";

const FoodCard = ({ food }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userLogin);

  return (
    <Card className={classes.card}>
      {console.log(user, food?.chef)}
      <img alt="food_img" src={food.image} className={classes.img} />
      {food?.chef.toString() === user?._id.toString() ? (
        <Link to={`/edit-food/` + food?._id}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => dispatch(AddToCart(food))}
          >
            Edit
          </Button>
        </Link>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => dispatch(AddToCart(food))}
        >
          Add
        </Button>
      )}

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
            {" "}
            4.5
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
export default FoodCard;
