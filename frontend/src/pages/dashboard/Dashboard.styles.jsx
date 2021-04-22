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
    profileGrid:{
        padding:"1.5rem 2rem"
    },
    profileHeader:{
        color: theme.palette.primary.main,
        padding:"1rem 0 0.5rem 0"
    },
    profileLink:{
        color:"#959292",
        padding:"0.7rem 0 0 0",
        fontSize:"1.2rem",
        '&:hover':{
            color:theme.palette.primary.main
        }
    },
    cardsDiv:{
        marginTop:"2rem"
    }
}))