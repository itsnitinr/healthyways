import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  addFoodDiv: {
    background: "#C2EDD2",
    minHeight: "150vh",
  },
  container: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 700,
    position: "relative",
    padding: "12rem 0 6rem 0",
  },
  message: {
    width: "100%",
    fontSize: "1.2rem",
    fontFamily: "Roboto",
    marginTop: "1.5rem",
    padding: "0.7rem",
    "&:focus": {
      outline: "#C2EDD2",
    },
  },
  inputfile: {
    display: "none",
  },
  card: {
    padding: "2rem",
    paddingTop: "10rem",
  },
  tags: {
    textAlign: "left",
    fontSize: "0.9rem",
  },
  button: {
    marginTop: "2.5rem",
    background: "#14A18C",
    borderRadius: "20px",
    width: "30%",
    "&:hover": {
      background: "#14A18C",
    },
  },
  buttonGrid: {
    textAlign: "center",
  },
  day: {
    margin: "0.75rem 0 0 0",
    border: "2px solid #14A18C",
  },
  available: {
    color: "#14A18C",
    textAlign: "left",
  },
  uploadFood: {
    height: "40vh",
    width: "40%",
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: "translateY(10%) translateX(-50%)",
    zIndex: "1",
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
      width: "60%",
      top: "0%",
      left: "50%",
      transform: "translateY(10%) translateX(-50%)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
      width: "80%",
      top: "0%",
      left: "50%",
      transform: "translateY(20%) translateX(-50%)",
    },
  },
  uploadimgDiv: {
    position: "relative",
    zIndex: "1",
    background: "black",
  },
  uploadimage: {
    position: "absolute",
    left: "40%",
    top: "30%",
    transform: "translateY(400%) translateX(60%)",
    zIndex: "1",
    [theme.breakpoints.down("sm")]: {
      left: "30%",
      top: "50%",
      transform: "translateY(350%) translateX(60%)",
    },
    [theme.breakpoints.down("xs")]: {
      left: "15%",
      top: "50%",
      transform: "translateY(350%) translateX(60%)",
    },
  },
  edit: {
    marginTop: "2rem",
    padding: "0.5rem 3rem",
  },
  delete: {
    marginTop: "2rem",
    padding: "0.5rem 3rem",
    background: "red",
    color: "white",
  },
}));
