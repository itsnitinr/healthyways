import {
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './Sidebar.styles';

export default function SideDrawer({
  openDrawer,
  toggleDrawer,
  navItems,
  navCommon,
}) {
  const classes = useStyles();
  const brand = (
    <List>
      <ListItem>
        <Typography variant="h6" color="primary">
          HealthyWays
        </Typography>
      </ListItem>
    </List>
  );
  const list = (
    <div role="presentation">
      <List>
        {navItems.map((item, key) => {
          let ListItemProps = {
            button: item.type === 'button',
            variant: item.type === 'button' ? item.buttonType : '',
            onClick: item.onClick,
          };
          if (item.href) {
            ListItemProps = {
              ...ListItemProps,
              ...{ to: item.href, component: RouterLink },
            };
          }
          return (
            <>
              <ListItem key={key} {...ListItemProps} style={item.style}>
                {item.avatar ? (
                  <ListItemAvatar>
                    {' '}
                    <Avatar alt={item.label} src={item.avatar} />{' '}
                  </ListItemAvatar>
                ) : (
                  ''
                )}
                {item.icon ? (
                  <ListItemIcon style={item.iconStyle}>
                    {' '}
                    {item.icon}{' '}
                  </ListItemIcon>
                ) : (
                  ''
                )}
                <ListItemText
                  primaryTypographyProps={{ variant: item.variant || 'button' }}
                >
                  {item.label}
                </ListItemText>
              </ListItem>
            </>
          );
        })}
      </List>
      <List>
        {navCommon.map((item, key) => {
          let ListItemProps = {
            button: item.type === 'button',
            variant: item.type === 'button' ? item.buttonType : '',
            onClick: item.onClick,
          };
          if (item.href) {
            ListItemProps = {
              ...ListItemProps,
              ...{ to: item.href, component: RouterLink },
            };
          }
          return (
            <>
              <ListItem key={key} {...ListItemProps} style={item.style}>
                {item.avatar ? (
                  <ListItemAvatar>
                    {' '}
                    <Avatar alt={item.label} src={item.avatar} />{' '}
                  </ListItemAvatar>
                ) : (
                  ''
                )}
                {item.icon ? (
                  <ListItemIcon style={item.iconStyle}>
                    {' '}
                    {item.icon}{' '}
                  </ListItemIcon>
                ) : (
                  ''
                )}
                <ListItemText
                  primaryTypographyProps={{ variant: item.variant || 'button' }}
                >
                  {item.label}
                </ListItemText>
              </ListItem>
            </>
          );
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.sideDrawerWrapper}>
      <SwipeableDrawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Grid container spacing={1} className={classes.sideDrawerContent}>
          <Grid item xs={12} component={RouterLink} to="/">
            <Grid item xs={6} style={{ margin: 'auto' }}>
              {brand}
            </Grid>
          </Grid>
          <Divider light />
          <Grid item xs={12}>
            {list}
          </Grid>
        </Grid>
      </SwipeableDrawer>
    </div>
  );
}
