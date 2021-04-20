import React, { useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Box,
  Button,
} from "@material-ui/core";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./CartPage.styles";
import { AddToCart, removeFromCart, clearItemFromCart } from "../../redux/cart/cart.actions"

const CartPage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userLogin);


  useEffect(() => {
    if (!user) {
      history.push("/signin");
    }
  }, [history, user]);
  return (
    <div>
      <Container>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tablecell}>Image</TableCell>
                <TableCell className={classes.tablecell}>Food Name</TableCell>
                <TableCell className={classes.tablecell}>Quantity</TableCell>
                <TableCell className={classes.tablecell}>Price</TableCell>
                <TableCell className={classes.tablecell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <img
                      className={classes.foodImage}
                      src={item.image}
                      alt={item.foodName}
                    />
                  </TableCell>
                  <TableCell>{item.foodName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price*item.quantity}</TableCell>
                  <TableCell>
                    <Box>
                      <Button
                        className={classes.add}
                        variant="contained"
                        color="primary"
                        onClick={()=>dispatch(AddToCart(item))}
                      >
                        <GrAdd className={classes.addIcon} />
                      </Button>
                      <Button
                        className={classes.subtract}
                        variant="contained"
                        color="primary"
                        onClick={()=>dispatch(removeFromCart(item))}
                      >
                        <GrSubtract className={classes.subtractIcon} />
                      </Button>
                      <Button
                        className={classes.remove}
                        variant="contained"
                        color="primary"
                        onClick={()=>dispatch(clearItemFromCart(item?._id))}
                      >
                        <ImCross />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default CartPage;
