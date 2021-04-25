import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrDocumentPdf, GrCamera } from 'react-icons/gr';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AiOutlineUser } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import useStyles from './OnBoarding.styles';
import { onBoarding } from '../../redux/user/user.actions';
import { enqueueSnackbar } from '../../redux/alert/alert.actions';

const OnBoarding = ({ history }) => {
  const [formData, setFormData] = useState({
    pincode: '',
    verificationDocument: '',
    phoneNumer: '',
    profilePic: '',
  });

  const { pincode, verificationDocument, phoneNumber, profilePic } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDocsChange = (e) => {
    setFormData({ ...formData, verificationDocument: e.target.files[0] });
  };

  const handleImgChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const { user } = useSelector((state) => state.userLogin);
  const { loading, success } = useSelector((state) => state.userOnboarding);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
    if (user.pincode || success) {
      history.push('/home');
    }
  }, [user, history, success]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('pincode', pincode);
    formdata.append('phoneNumber', phoneNumber);
    if (user?.isChef) {
      if (!verificationDocument) {
        return dispatch(
          enqueueSnackbar({
            message: 'You must attach the verification document',
            options: { variant: 'error' },
          })
        );
      } else {
        formdata.append('verificationDocument', verificationDocument);
      }
    }

    if (profilePic) {
      formdata.append('profilePic', profilePic);
    }

    dispatch(onBoarding(formdata));
  };

  const classes = useStyles();
  return (
    <div className={classes.onboardBack}>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <AiOutlineUser className={classes.avatar} />
          <Box>
            <Typography variant="h5">Onboarding</Typography>
          </Box>
          <form onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              autoFocus
              value={phoneNumber}
              onChange={handleChange}
              type="tel"
              pattern="^[6-9]\d{9}$"
            />
            <TextField
              id="outlined-basic"
              label="pincode"
              value={pincode}
              onChange={handleChange}
              name="pincode"
              className={classes.input}
              InputProps={{ endAdorment: <BiMap /> }}
              variant="outlined"
            />

            <br />
            <input
              accept="image/*"
              className={classes.inputfile}
              name="profilePic"
              type="file"
              onChange={handleImgChange}
              id="photo-button"
            />
            <label htmlFor="photo-button">
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component="span"
              >
                <GrCamera /> &nbsp;&nbsp;&nbsp; Upload Your Photo
              </Button>
            </label>
            <br />
            <br />

            {user?.isChef && (
              <>
                <input
                  accept=".pdf"
                  className={classes.inputfile}
                  name="verificationDocument"
                  type="file"
                  onChange={handleDocsChange}
                  id="document-button"
                />
                <label htmlFor="document-button">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    component="span"
                  >
                    <GrDocumentPdf /> &nbsp;&nbsp;&nbsp; Upload Documents
                  </Button>
                </label>
                <br />
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Get Started
            </Button>
            {loading && <CircularProgress />}
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default OnBoarding;
