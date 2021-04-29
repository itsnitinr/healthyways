import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: '90%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    marginBottom: '1.5rem',
  },
  address: {
    marginBottom: '1.5rem',
  },
  remark: {
    margin: '1.5rem 0',
  },
  cost: {
    marginTop: '1.5rem',
  },
  checkIcon: {
    fill: theme.palette.secondary.main,
  },
  clearIcon: {
    fill: theme.palette.error.main,
  },
  heading: {
    borderBottom: '5px solid #54be73',
    marginBottom: '1.25rem',
    width: '200px',
  },
}));

export default useStyles;
