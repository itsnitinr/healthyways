import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, LinearProgress, Typography } from "@material-ui/core";
import FoodCard from "../../components/foodcard/FoodCard.component";
import { getMyFood } from "../../redux/food/food.actions";

const MyFoodPage = ({ history }) => {
  const { user } = useSelector((state) => state.userLogin);
  const { foods } = useSelector((state) => state.myfood);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      history.push("/signin");
    }
    dispatch(getMyFood());
  }, [history, user, dispatch]);

  console.log(foods);

  return (
    <>
      {/* {loading && <LinearProgress />} */}
      {console.log(foods)}
      <Grid container spacing={1}>
        {foods.map((food) => (
          <Grid item md={3}>
            {console.log(food)}
            <FoodCard food={food} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyFoodPage;
