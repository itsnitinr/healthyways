import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  navbarBrand: {
    display: 'flex',
    flexGrow: 0.5,
    alignItems: 'center',
  },
  navbarLink: {
    cursor: 'pointer',
    color: theme.palette.text.dark,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  navbarIcon: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    maxWidth: '8rem',
    marginRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      marginRight: '2rem',
    },
  },
  navMenu: {
    display: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  navItem: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  signUpButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff !important',
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
}));
