import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
  onboardBack: {
    background: '#C2EDD2',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 500,
    margin: '2rem',
  },
  card: {
    padding: '2rem',
  },
  avatarDiv: {
    background: '#eee',
    padding: '1.5rem',
    borderRadius: '100rem',
    height: '2rem',
    width: '2rem',
    textAlign: 'center',
  },
  avatar: {
    fontSize: '2.5rem',
    color: '#14A18C',
  },
  input: {
    width: '100%',
    margin: '1rem 0',
  },
  inputfile: {
    display: 'none',
  },
  button: {
    margin: '1.5rem 0',
    padding: '0.5rem 2.5rem',
    background: '#14A18C',
    color: 'white',
    '&hover': {
      background: '#14A18C',
      color: 'white',
    },
  },
}));
