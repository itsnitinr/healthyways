import {useState} from 'react';
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container"
import IconButton from '@material-ui/core/IconButton';
import {AiFillCamera} from "react-icons/ai";
import {AiOutlineUser} from "react-icons/ai";
import {BiMap} from "react-icons/bi"
import useStyles from "./OnBoarding.styles";

const OnBoarding = () => {

    const[formData, setFormData] = useState({
        pincode:'',
        documents:'',
        phoneNumer:''
    })
    const {pincode, documents, phoneNumber} = formData;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    

    const classes = useStyles();
    return (
        <div className={classes.onboardBack}>
        <Container className={classes.container}>
            <Card className={classes.card}>
                <AiOutlineUser className={classes.avatar}/>
                <Box>
                    <Typography variant="h5">Onboarding</Typography>
                </Box>
                <form>
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
                        name="pincode" 
                        InputProps={{endAdorment: (<BiMap/>)}} 
                        variant="outlined" 
                    />

                    <br/>
                    <input
                        accept="image/*"
                        className={classes.inputfile}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />

                    <label htmlFor="contained-button-file">
                     <Button variant="contained" color="primary" component="span">
                         Upload
                    </Button>
                    </label>

                    <input accept="image/*" className={classes.inputfile} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <AiFillCamera />
                            </IconButton>
                        </label>
                        <br/>
                    <Button variant="contained" color="primary" className={classes.button}>Get Started</Button>
                </form>
            </Card>
        </Container>
        </div>
    )
}

export default OnBoarding;