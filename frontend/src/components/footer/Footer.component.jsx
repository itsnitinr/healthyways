import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import useStyles from "./Footer.styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Grid spacing={2} container>
        <Grid md={4} item>
          <Typography variant="h5" className={classes.header}>
            About Us
          </Typography>
          <hr className={classes.hr}></hr>
          <Typography className={classes.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make
          </Typography>
          <Box>
            <Button className={classes.iconButton}>
              <AiOutlineTwitter className={classes.icons} />
            </Button>
            <Button className={classes.iconButton}>
              <FaFacebookF className={classes.icons} />
            </Button>
            <Button className={classes.iconButton}>
              <AiFillInstagram className={classes.icons} />
            </Button>
            <Button className={classes.iconButton}>
              <FaLinkedinIn className={classes.icons} />
            </Button>
          </Box>
        </Grid>
        <Grid md={2} item>
          <Typography variant="h5" className={classes.header}>
            Quick Links
          </Typography>
          <hr className={classes.hr}></hr>
          <Box mt={1}>
            <Typography>
              <Link className={classes.links}>About</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Terms & Conditions</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Privacy Policy</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Help</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Contact</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid md={2} item>
          <Typography variant="h5" className={classes.header}></Typography>
          <Typography variant="h5" className={classes.header}>
            Quick Search
          </Typography>
          <hr className={classes.hr}></hr>
          <Box mt={1}>
            <Typography>
              <Link className={classes.links}>North Indian</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>South Indian</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Chinese</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Fast-Food</Link>
            </Typography>
            <Typography>
              <Link className={classes.links}>Thai</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid md={4} item>
          <Typography variant="h5" className={classes.header}>
            Contact Us
          </Typography>
          <hr className={classes.hr}></hr>
          <Box
            display="flex"
            justifyContent="flex-start"
            mt={1}
            alignItems="center"
          >
            <GoLocation className={classes.contactIcons} />
            <Typography>
              Riddhi Gardens, Goregaon Film City Road, Mumbai
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-start" mt={1}>
            <FaPhoneAlt className={classes.contactIcons}/>
            <Typography>+1212121212</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-start" mt={1}>
            <HiMail className={classes.contactIcons}/>
            <Typography>nitinranganath@gmail.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
