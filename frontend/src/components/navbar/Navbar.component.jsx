import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { MdMenu } from "react-icons/md";
import SideDrawer from "../sidebar/Sidebar.component";
import useStyles from "./Navbar.styles";
import { getNavItems } from "./NavItems";

import { logout } from "../../redux/user/user.actions";

export default function Navigation() {
  const classes = useStyles();

  const { user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const [openDrawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  const navItemsRaw = getNavItems({ user, dispatch, logout, classes });
  // const navItems = user
  //   ? user.isAdmin
  //     ? navItemsRaw.admin
  //     : navItemsRaw.auth
  //   : navItemsRaw.noAuth;

  const navItems = user
    ? user.isAdmin
      ? navItemsRaw.admin
      : user?.isChef
      ? navItemsRaw.chef
      : navItemsRaw.auth
    : navItemsRaw.noAuth;
  const navCommon = navItemsRaw.common;

  return (
    <>
      <AppBar
        color="inherit"
        elevation={0}
        position="sticky"
        style={{ borderBottom: "1px ridge rgba(0,0,0,.05)" }}
      >
        <Container maxWidth={false}>
          <Toolbar className={classes.navbarWrapper}>
            <div style={{ display: "flex", flex: 1 }}>
              <Link to="/">
                <Typography variant="h6" color="primary">
                  HealthyWays
                </Typography>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flex: 2,
                justifyContent: "flex-end",
              }}
            >
              <NavMenu
                classes={classes}
                navItems={navItems}
                navCommon={navCommon}
                user={user}
                dispatch={dispatch}
                logout={logout}
              />
              <IconButton
                color="inherit"
                onClick={toggleDrawer(true)}
                className={classes.menuButton}
              >
                <MdMenu />
              </IconButton>
              <SideDrawer
                openDrawer={openDrawer}
                toggleDrawer={toggleDrawer}
                navItems={navItems}
                navCommon={navCommon}
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

const NavMenu = ({ classes, navItems, navCommon, user, dispatch, logout }) => {
  return (
    <div className={classes.navMenu}>
      {navCommon.map((item, key) => (
        <Button
          variant={item.buttonType}
          className={item.class}
          onClick={item.onClick}
          to={item.href}
          component={Link}
          key={key}
          disableTouchRipple
          disableRipple
          disableFocusRipple
        >
          {item.label}
        </Button>
      ))}
      {navItems
        .filter((item) => item.showInNavbar !== false)
        .map((item, key) => {
          let menuItem;
          switch (item.type) {
            case "button":
              menuItem = (
                <Button
                  variant={item.buttonType}
                  className={item.class}
                  onClick={item.onClick}
                  to={item.href}
                  component={Link}
                  disableTouchRipple
                  disableRipple
                  disableFocusRipple
                >
                  {item.label}
                </Button>
              );
              break;
            default:
              menuItem = (
                <Typography variant={item.textVariant}>{item.label}</Typography>
              );
          }
          return (
            <div className={classes.navItem} key={key}>
              {menuItem}
            </div>
          );
        })}
    </div>
  );
};
