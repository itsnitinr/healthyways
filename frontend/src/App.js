import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignIn from "./pages/signin/SignIn.component";
import SignUp from "./pages/signup/SignUp.component";
import HomePage from "./pages/home-page/HomePage.component"
import LandingPage from "./pages/landing-page/LandingPage.component";
import OnBoarding from './pages/on-boarding/OnBoarding.component';
import theme from './theme';
import store from "./redux/store"
function App() {
  return (
   <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/onboarding" component={OnBoarding}/>
          </Switch>
        </BrowserRouter>
      </Provider>
   </ThemeProvider>
  );
}

export default App;
 