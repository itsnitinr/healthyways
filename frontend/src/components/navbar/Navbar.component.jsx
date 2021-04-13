import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { MdAccountCircle } from 'react-icons/md';
import MenuItem from '@material-ui/core/MenuItem';
import { RiMenu5Fill } from 'react-icons/ri';
import useStyles from './Navbar.styles';

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar} x>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <RiMenu5Fill />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Homely
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MdAccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem>Logout</MenuItem>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem>
                    <Link to="/signup/cook">Sign Up as Cook</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/signup/user">Sign Up as User</Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
