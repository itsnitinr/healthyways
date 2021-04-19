import { ThemeProvider, Button } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/navbar/Navbar.component';
import SignIn from './pages/signin/SignIn.component';
import SignUp from './pages/signup/SignUp.component';
import HomePage from './pages/home-page/HomePage.component';
import LandingPage from './pages/landing-page/LandingPage.component';
import OnBoarding from './pages/on-boarding/OnBoarding.component';
import { SnackbarProvider } from 'notistack';
import Notifier from './components/notifier/Notifier.component';
import VerifyEmail from './pages/verifiy-email/VerifyEmail.component';
import ForgotPassword from './pages/forgot-password/ForgotPassword.component';
import ResetPassword from './pages/reset-password/ResetPassword.component';
import AddFood from "./pages/add-food-page/AddFood.pages";
import Footer from "./components/footer/Footer.component";
import theme from './theme';
import store from './redux/store';
import { closeSnackbar } from './redux/alert/alert.actions';

const snackbarDimissButton = () => (
  <Button onClick={() => store.dispatch(closeSnackbar())}>dismiss me</Button>
);

const snackbarPosition = () => ({ vertical: 'bottom', horizontal: 'right' });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={1}
          action={snackbarDimissButton}
          anchorOrigin={snackbarPosition()}
        >
          <Notifier />
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/onboarding" component={OnBoarding} />
              <Route
                path="/verify/:verificationToken"
                component={VerifyEmail}
              />
              <Route path="/forgot" component={ForgotPassword} />
              <Route
                path="/reset-password/:resetToken"
                component={ResetPassword}
              />
              <Route path="/add-food" component={AddFood}/>
            </Switch>
            <Footer/>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
