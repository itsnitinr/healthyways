import {makeStyles} from "@material-ui/core/styles";
import userDashboard from "../../assets/user-dashboard.png";
export default makeStyles((theme)=>({
    root:{
        margin:"2rem 2rem"
    },
    userDetailsDiv:{
        background:`url(${userDashboard})`,
        height:"60vh",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
    },
    userDetails:{
        display:'flex',
        justifyContent:"space-between",
        alignItems:"flex-end",
        bottom:0,
        height:"50vh",  
    },
    name:{
        color:"white",
        paddingLeft:"1.5rem",
        [theme.breakpoints.down("xs")]:{
            paddingLeft:"1rem",
        }
    },
    date:{
        color:"white",
        paddingRight:"1.5rem",
        [theme.breakpoints.down("xs")]:{
            paddingLeft:"1rem",
        }
    },
    
}))