import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  foodImage: {
    height: "5rem",
    width: "6rem",
  },
  table: {
    margin: "2.5rem 0",
  },
  tablecell: {
    fontSize: "1.3rem",
  },
  add: {
    margin: "0 1rem",
    border: "none",
    background: theme.palette.primary.main,
    padding: "0.3rem 0.4rem",
    color: "white",
    borderRadius: "0.3rem",
  },
  subtract: {
    margin: "0 1rem",
    border: "none",
    background: theme.palette.primary.main,
    padding: "0.3rem 0.4rem",
  },
  remove: {
    margin: "0 1rem",
    background: "red",
    margin: "0 1rem",
    border: "none",
    padding: "0.3rem 0.4rem",
    color: "white",
  },
  icon: {
    fill: "white",
  },
  price: {
    color: theme.palette.primary.main,
    paddingLeft: "0.5rem",
  },
  card: {
    border: "solid 1px #14A18C",
    margin: "3rem 0",
  },
  chefInfo: {
    background: "#eee",
    padding: "1rem 1.2rem",
  },
}));
