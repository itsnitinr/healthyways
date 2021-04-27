import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./EditProfile.styles";
import {
  Button,
  Container,
  Typography,
  LinearProgress,
  TextField,
  Card,
  Box,
} from "@material-ui/core";
import { AiOutlineUser } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { onBoarding } from "../../redux/user/user.actions";

const EditProfile = ({ history }) => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userLogin);
  const { loading, success } = useSelector((state) => state.userOnboarding);

  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || "",
    pincode: user?.pincode || "",
  });

  const [profilePic, setFile] = useState("");
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    if (!user) {
      history.push("/signin");
    }
    if (success) {
      history.push("/home");
    }
  }, [user, history]);
  const { phoneNumber, pincode } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("pincode", pincode);
    if (profilePic) {
      formdata.append("profilePic", profilePic);
    }
    dispatch(onBoarding(formdata));
  };
  return (
    <div>
      <div className={classes.onboardBack}>
        {loading && <LinearProgress />}
        <Container className={classes.container}>
          <Card className={classes.card}>
            <AiOutlineUser className={classes.avatar} />
            <Box>
              <Typography variant="h5">Update Profile</Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <TextField
                id="outlined-basic"
                label="Phone Numer"
                value={phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                className={classes.input}
                InputProps={{ endAdorment: <BiMap /> }}
                variant="outlined"
              />

              <TextField
                id="outlined-basic"
                label="Pincode"
                value={pincode}
                onChange={handleChange}
                name="pincode"
                className={classes.input}
                InputProps={{ endAdorment: <BiMap /> }}
                variant="outlined"
              />

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                name="profilePic"
              />
              <br />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Update Profile
              </Button>
            </form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default EditProfile;
