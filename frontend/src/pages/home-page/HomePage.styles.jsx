import { makeStyles } from '@material-ui/core/styles';
import homePage from '../../assets/homely-landing.png';

export default makeStyles((theme) => ({
  heroSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: `url(${homePage})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  heroHeader: {
    color: 'white',
    fontSize: '70px',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '3rem',
  },
  highlightColor: {
    color: '#38ef7d',
  },
  searchform: {
    display: 'flex',
  },
  searchbox: {
    width: '55vw',
    padding: '12px',
    background: '#eee',
    fontSize: '18px',
    border: 'none',
    borderRadius: '10px 0 0 10px',
    '&:focus': {
      outline: 'solid 2px #11998e',
    },
  },
  searchButton: {
    padding: '15px 30px',
    border: 'none',
    background: '#11998e',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '0 10px 10px 0',
  },
  advancedSearch: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px',
    marginTop: '20px',
    textDecoration: 'none',
  },

  foodNearYou: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '3rem 0',
  },
}));
