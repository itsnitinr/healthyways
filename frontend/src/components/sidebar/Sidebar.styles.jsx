import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  sideDrawerWrapper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sideDrawerContent: {
    width: '80vw',
    maxWidth: '400px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  brandIcon: {
    maxWidth: '100%',
    height: 'auto',
  },
  fullList: {
    width: 'auto',
  },
  signUpButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
