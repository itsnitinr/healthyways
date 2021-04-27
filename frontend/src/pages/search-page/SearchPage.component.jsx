import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchFood } from "../../redux/food/food.actions";
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import FoodCard from "../../components/foodcard/FoodCard.component";

const SearchPage = ({ history }) => {
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const foodToSearch = query.get("search");

  const foodQuery = foodToSearch || "";

  const { user } = useSelector((state) => state.userLogin);
  const { loading, foods } = useSelector((state) => state.foodSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/signin");
    } else if (!user?.pincode) {
      history.push("/onboarding");
    } else {
      dispatch(searchFood(foodQuery));
    }
  }, [user, history, dispatch]);

  return (
    <p>
      {loading ? (
        <CircularProgress
          color="primary"
          style={{ display: "block", margin: "30vh auto" }}
        />
      ) : (
        <Container style={{ margin: "3rem 0" }}>
          <Typography variant="h4" gutterBottom color="primary">
            Your Search Results
          </Typography>
          <Grid container spacing={1}>
            {foods.length > 0
              ? foods.map((food) => (
                  <Grid item md={3}>
                    {console.log(food)}
                    <FoodCard food={food} />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Container>
      )}
    </p>
  );
};

export default SearchPage;
