import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Container, Paper } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@material-ui/lab';
import { GiCook, GiHeartBeats, GiHotMeal } from 'react-icons/gi';
import { MdRestaurantMenu, MdPayment } from 'react-icons/md';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import {
  AiOutlinePercentage,
  AiOutlineShoppingCart,
  AiOutlineCheck,
} from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import landingImg from '../../assets/landing-img.png';
import useStyles from './LandingPage.styles';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        className={classes.heroSection}
        justify="center"
        alignItems="center"
      >
        <Grid item md={6} className={classes.heroContent}>
          <Typography variant="h1" className={classes.heroHeading}>
            Home-cooked Delights, At Your Fingertips!
          </Typography>
          <Typography className={classes.heroDescription}>
            Freshly cooked with love from passionate chefs nearby, we aim to
            provide you with nutritious and healthy meals that are fulfulling,
            tasty and light on your pocket.
          </Typography>
          <Link to="/home">
            <Button variant="contained" className={classes.heroButton}>
              Order Now
            </Button>
          </Link>
        </Grid>
        <Grid item md={6}>
          <img
            src={landingImg}
            className={classes.heroImage}
            alt="Landing Food Platter"
          />
        </Grid>
      </Grid>
      <Container className={classes.aboutContainer}>
        <Grid container justify="center" spacing={6}>
          <Grid item md={4} sm={6}>
            <div className={classes.featureBox}>
              <GiCook className={classes.icon} fontSize={84} />
              <div className={classes.featureContent}>
                <Typography variant="h6" className={classes.featureHeading}>
                  Made by Local & Talented Chefs
                </Typography>
                <Typography color="primary" className={classes.featureBody}>
                  Our chefs are like carefully chosen after thorough inspection
                  to provide you the best quality home-cooked food.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={6}>
            <div className={classes.featureBox}>
              <MdRestaurantMenu className={classes.icon} fontSize={84} />
              <div className={classes.featureContent}>
                <Typography variant="h6" className={classes.featureHeading}>
                  Wide Range of Food Items
                </Typography>
                <Typography color="primary" className={classes.featureBody}>
                  From North Indian to South Indian, we've got all your
                  favourite delicacies covered in our menu.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={6}>
            <div className={classes.featureBox}>
              <GiHeartBeats className={classes.icon} fontSize={84} />
              <div className={classes.featureContent}>
                <Typography variant="h6" className={classes.featureHeading}>
                  Health Conscious Food
                </Typography>
                <Typography color="primary" className={classes.featureBody}>
                  All the food we serve are cooked at home with exceptional care
                  towards keeping you fit and fine.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={6}>
            <div className={classes.featureBox}>
              <FaHandHoldingHeart className={classes.icon} fontSize={84} />
              <div className={classes.featureContent}>
                <Typography variant="h6" className={classes.featureHeading}>
                  Support Those In Need
                </Typography>
                <Typography color="primary" className={classes.featureBody}>
                  Our chefs are ordinary people like you and me. Support them
                  directly via ordering through our services.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={6}>
            <div className={classes.featureBox}>
              <HiOutlineSpeakerphone className={classes.icon} fontSize={84} />
              <div className={classes.featureContent}>
                <Typography variant="h6" className={classes.featureHeading}>
                  We're Vocal for Local
                </Typography>
                <Typography color="primary" className={classes.featureBody}>
                  We collaborate with local individuals and small catering
                  services in your neighbourhood.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={4} sm={6}>
            <div className={classes.featureBox}>
              <AiOutlinePercentage className={classes.icon} fontSize={84} />
              <div className={classes.featureContent}>
                <Typography variant="h6" className={classes.featureHeading}>
                  Zero Commissions, for real!
                </Typography>
                <Typography color="primary" className={classes.featureBody}>
                  Unlike others, we are here for a social cause and do not
                  charge any commissions for the orders placed.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <section className={classes.timelineContainer}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Ridiculously Simple!
        </Typography>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <BiFoodMenu fontSize={32} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={1} className={classes.paper}>
                <Typography>
                  Browse for food items and chefs available near you from our
                  wide array.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <AiOutlineShoppingCart fontSize={32} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={1} className={classes.paper}>
                <Typography>
                  Add your favourite food items to the cart as per your required
                  serving.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <AiOutlineCheck fontSize={32} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={1} className={classes.paper}>
                <Typography>
                  Wait for the chef to confirm your order.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <MdPayment fontSize={32} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={1} className={classes.paper}>
                <Typography>
                  Once confirmed, pay for your order using multiple online
                  payment methods.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <GiHotMeal fontSize={32} />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography>
                  Enjoy your hot, tasty and healthy meal freshly cooked with
                  love.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </section>
    </>
  );
};

export default LandingPage;
