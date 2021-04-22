import {makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme)=>({

    card:{
        background:theme.palette.primary.main,
        textAlign:"center",
        padding:"1.5rem 0",
        color:"white"
    },
    heading:{
        padding:"1rem 0 0.5rem 0"
    },
    number:{
        fontWeight:"bold"
    }
}))