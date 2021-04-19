import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Typography,
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
  LinearProgress,
} from "@material-ui/core";
import useStyles from "./AddFood.styles";
import {addFoodItem} from "../../redux/food/food.actions"

const AddFood = ({history}) => {
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    category: "",
    tags: "",
    description: "",
  });

  const [availableOn, setAvailableOn] = useState([]);

  const [image, setImage] = useState("");
  const classes = useStyles();

  const { foodName, price, category, description, tags } = formData;

  const { user } = useSelector((state) => state.userLogin);
  const {food, loading} = useSelector((state)=>state.foodAdd);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
      history.push("/signin");
    }
    if(!user?.isChef){
      history.push("/home")
    }
    if(food){
      history.push("/home");
    }
  }, [history, user, food]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToAvailability = (value) => {
    setAvailableOn([...availableOn, value]);
  };

  const removeAvailability = (value) => {
    setAvailableOn(availableOn.filter((val) => val !== value));
  };

  const onChangeAvailableOn = (e) => {
    if (availableOn.includes(e.currentTarget.value)) {
      removeAvailability(e.currentTarget.value);
    } else {
      addToAvailability(e.currentTarget.value);
    }
  };

  const checkAvailability = (value) => {
    return availableOn.includes(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('foodName', foodName);
    formdata.append('price', price);
    formdata.append('category', category);
    formdata.append('description', description);
    formdata.append('availableOn', availableOn);
    formdata.append('image', image);
    formdata.append('tags', tags);
  

    dispatch(addFoodItem(formdata));
  };

  return (
    <div className={classes.addFoodDiv}>
    {loading && <LinearProgress/>}
      <form onSubmit={onSubmit}>
        <Box className={classes.uploadimgDiv}>
          <img
            className={classes.uploadFood}
            alt="img"
            src={
              image
                ? URL.createObjectURL(image)
                : "https://wallpaperaccess.com/full/1285990.jpg"
            }
          />
          <div className={classes.uploadimage}>
            <input
              accept="images/*"
              className={classes.inputfile}
              id="contained-button-file"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>
          </div>
        </Box>
        <Container className={classes.container}>
          <Card className={classes.card}>
            <Box>
              <Typography variant="h4">Add your food item</Typography>
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Food Name"
              name="foodName"
              value={foodName}
              autoFocus
              onChange={onChange}
            />
            <Grid spacing={1} container alignItems="center">
              <Grid md={6} sm={6} xs={12} item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Price"
                  value={price}
                  name="price"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>

              <Grid md={6} sm={6} xs={12} item>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Category"
                    name="category"
                    value={category}
                    onChange={onChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="North Indian">North Indian</MenuItem>
                    <MenuItem value="South Indian">South Indian</MenuItem>
                    <MenuItem value="Chinese">Chinese</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Tags"
              name="tags"
              value={tags}
              autoFocus
              onChange={onChange}
            />
            <i>
              <Typography color="textSecondary" className={classes.tags}>
                for eg healthy, tasty
              </Typography>
            </i>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={4}
              className={classes.message}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChange}
            />
            <i>
              <Typography color="textSecondary" className={classes.tags}>
                for eg 3 puris, 2 rotis
              </Typography>
            </i>
            <br />
            <Typography variant="h5" className={classes.available}>
              Availability
            </Typography>
            <Grid
              spacing={2}
              container
              justify="center"
              className={classes.buttonGrid}
            >
              <Grid md={3} item>
                <Button
                  variant={
                    checkAvailability("sunday") ? "contained" : "outlined"
                  }
                  value="sunday"
                  onClick={onChangeAvailableOn}
                  color="primary"
                  className={classes.day}
                >
                  Sunday
                </Button>
              </Grid>
              <Grid md={3} item>
                <Button
                  value="monday"
                  onClick={onChangeAvailableOn}
                  variant={
                    checkAvailability("monday") ? "contained" : "outlined"
                  }
                  color="primary"
                  className={classes.day}
                >
                  Monday
                </Button>
              </Grid>
              <Grid md={3} item>
                <Button
                  variant={
                    checkAvailability("tuesday") ? "contained" : "outlined"
                  }
                  value="tuesday"
                  onClick={onChangeAvailableOn}
                  color="primary"
                  className={classes.day}
                >
                  Tuesday
                </Button>
              </Grid>
              <Grid md={3} item>
                <Button
                  variant={
                    checkAvailability("wednesday") ? "contained" : "outlined"
                  }
                  value="wednesday"
                  onClick={onChangeAvailableOn}
                  color="primary"
                  className={classes.day}
                >
                  Wednesday
                </Button>
              </Grid>
              <Grid md={3} item>
                <Button
                  variant={
                    checkAvailability("thursday") ? "contained" : "outlined"
                  }
                  value="thursday"
                  onClick={onChangeAvailableOn}
                  color="primary"
                  className={classes.day}
                >
                  Thursday
                </Button>
              </Grid>
              <Grid md={3} item>
                <Button
                  variant={
                    checkAvailability("friday") ? "contained" : "outlined"
                  }
                  value="friday"
                  onClick={onChangeAvailableOn}
                  color="primary"
                  className={classes.day}
                >
                  Friday
                </Button>
              </Grid>
              <Grid md={3} item>
                <Button
                  variant={
                    checkAvailability("saturday") ? "contained" : "outlined"
                  }
                  value="saturday"
                  onClick={onChangeAvailableOn}
                  color="primary"
                  className={classes.day}
                >
                  Saturday
                </Button>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default AddFood;
