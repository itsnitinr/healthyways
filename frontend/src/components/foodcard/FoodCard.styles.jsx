import {makeStyles} from "@material-ui/core/styles";
export default makeStyles(()=>({
    card:{
        width: '100%',
        position: 'relative',
        boxShadow:"none",
    },
    img:{
        width: '100%',
        borderRadius:"0.5rem",  
    },
    button:{
        background: '#14A18C',
        position: 'absolute',
        display: 'block',
        right: '5%',
        fontWeight: 'bold',
        color: 'white',
        padding: '7px 40px',
        transform: 'translateY(-70%) translateX(-7%)',
        '&:hover':{
            background:"#14A18C",
        
        }
    },
    foodName:{
        fontWeight:"bold"
    },
    price:{
        color:"#14A18C",
        fontWeight:"bold"
    },
    star:{
        color:"#E1E440",
        fontSize:"1.5rem",
    },
    rating:{
        color:"#777777",
        fontWeight:"bold"
    },
    
}))