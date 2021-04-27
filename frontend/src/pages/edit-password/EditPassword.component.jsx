import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./EditPassword.styles";
import {
  Button,
  Container,
  Typography,
  LinearProgress,
  TextField,
  Card,
  Box,
} from "@material-ui/core";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiMap } from "react-icons/bi";
import { updatePassword } from "../../redux/user/user.actions";

const EditPassword = ({ history }) => {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userLogin);

  const { success, loading } = useSelector((state) => state.userUpdate);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/signin");
    }
    if (success) {
      history.push("/home");
    }
  }, [user, history, success]);
  const { currentPassword, newPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(currentPassword, newPassword));
  };
  return (
    <div>
      <div className={classes.onboardBack}>
        {loading && <LinearProgress />}
        <Container className={classes.container}>
          <Card className={classes.card}>
            <RiLockPasswordFill className={classes.avatar} />
            <Box>
              <Typography variant="h5">Update Password</Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <TextField
                id="outlined-basic"
                label="Current Password"
                value={currentPassword}
                onChange={handleChange}
                name="currentPassword"
                className={classes.input}
                InputProps={{ endAdorment: <BiMap /> }}
                variant="outlined"
                type="password"
              />

              <TextField
                id="outlined-basic"
                label="New Password"
                value={newPassword}
                onChange={handleChange}
                name="newPassword"
                className={classes.input}
                InputProps={{ endAdorment: <BiMap /> }}
                variant="outlined"
                type="password"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Update Password
              </Button>
            </form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default EditPassword;
