import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    card:{
        border:"solid 1px #eee",
        borderRadius:"0.5rem",
        width:"100%"
    },
    orderDetails:{
        margin:"1rem"
    },
    orderImage:{
        height:"6rem",
        width:"6rem",
        margin:"1rem"
    },
    header:{
        fontWeight:"500"
    },
    price:{
        [theme.breakpoints.down("xs")]:{
            paddingRight:"2rem"
        }
    }
}))