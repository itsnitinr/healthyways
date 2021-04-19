import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  footer: {
    background: theme.palette.primary.main,
    overflowX:'hidden',
    padding:"1.5rem 2rem",
    color:"white"
  },
  header:{
      color:"white",
  },
  description:{
      fontSize:'1rem',
      color:"white"
  },
  icons:{
      fontSize:"1.2rem",
      color:"white",
  },
  iconButton:{
    background:"#42B3A3",
    padding:"0.6rem 0.2rem",
    margin:"0.5rem"
  },
  links:{
      color:"white"
  },
  contactIcons:{
      fontSize:"1.2rem",
      marginRight:"1rem",
      color:"white"
  },
  hr:{
      width:"20%",
      margin:"0.5rem 0 1.5rem 0",
      color:"white",
  }
}));
