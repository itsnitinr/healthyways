import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { MdVisibility, MdVisibilityOff, MdLock } from 'react-icons/md';
import useStyles from './ResetPassword.styles';

import { resetPassword } from '../../redux/user/user.actions';

export default function NewPass({ history }) {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const { resetToken } = useParams();

  const passwordsMatch = () => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    )
      return true;
    return false;
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (passwordsMatch()) {
      dispatch(resetPassword(password, resetToken));
    }
  };

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <Box pt={6} pb={8}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MdLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new password
          </Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoFocus
              InputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password-confirm"
              label="Confirm Password"
              name="password-confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              InputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <MdVisibility />
                      ) : (
                        <MdVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="subtitle2"
              className={passwordsMatch() ? classes.green : classes.red}
            >
              {password.length && confirmPassword.length ? (
                passwordsMatch() ? (
                  'Passwords match'
                ) : (
                  "Passwords don't match"
                )
              ) : (
                <span>&nbsp;</span>
              )}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </Box>
  );
}
