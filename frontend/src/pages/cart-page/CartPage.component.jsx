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
import { useSelector } from "react-redux";
import useStyles from "./CartPage.styles";

const CartPage = ({ history }) => {
  const classes = useStyles();

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
              <TableRow>
                <TableCell component="th" scope="row">
                  <img
                    className={classes.foodImage}
                    src="https://www.clubmahindra.com/blog/media/section_images/traditiona-4587f0ec65deaf1.jpg"
                  />
                </TableCell>
                <TableCell>Idli</TableCell>
                <TableCell>1 plate</TableCell>
                <TableCell>₹50</TableCell>
                <TableCell>
                  <Box>
                    <Button
                      className={classes.add}
                      variant="contained"
                      color="primary"
                    >
                      <GrAdd className={classes.addIcon} />
                    </Button>
                    <Button
                      className={classes.subtract}
                      variant="contained"
                      color="primary"
                    >
                      <GrSubtract className={classes.subtractIcon} />
                    </Button>
                    <Button
                      className={classes.remove}
                      variant="contained"
                      color="primary"
                    >
                      <ImCross />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default CartPage;
