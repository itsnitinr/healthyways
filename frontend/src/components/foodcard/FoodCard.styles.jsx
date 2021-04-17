import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    width: '100%',
    maxWidth: '100vw',
    position: 'relative',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      padding: '0 1rem',
    },
  },
  img: {
    width: '100%',
    borderRadius: '0.5rem',
    maxHeight: 180,
    [theme.breakpoints.down('xs')]: {
      maxHeight: 200,
    },
  },
  button: {
    background: '#14A18C',
    position: 'absolute',
    display: 'block',
    right: '5%',
    fontWeight: 'bold',
    color: 'white',
    padding: '5px 25px',
    transform: 'translateY(-70%) translateX(-10%)',
    '&:hover': {
      background: '#14A18C',
    },
    [theme.breakpoints.down('xs')]: {
      transform: 'translateY(-70%) translateX(-15%)',
    },
  },
  foodName: {
    fontWeight: 'bold',
  },
  price: {
    color: '#14A18C',
    fontWeight: 'bold',
  },
  star: {
    color: '#E1E440',
    fontSize: '1.5rem',
  },
  rating: {
    color: '#777777',
    fontWeight: 'bold',
  },
}));
