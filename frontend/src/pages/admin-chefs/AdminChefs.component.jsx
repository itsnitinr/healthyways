import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { getAllChefs, verifyChef } from '../../redux/user/user.actions';

const AdminChefs = ({ history }) => {
  const { chefs, loading } = useSelector((state) => state.chefList);
  const { success } = useSelector((state) => state.chefVerify);
  const { user } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/home');
    } else {
      dispatch(getAllChefs());
    }
    if (success) {
      dispatch(getAllChefs());
    }
  }, [history, user, dispatch, success]);

  return (
    <Container style={{ margin: '3rem 0' }}>
      <Typography variant="h4" color="primary">
        Manage Chefs
      </Typography>
      {loading ? (
        <LinearProgress />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Chef ID</b>
                </TableCell>
                <TableCell>
                  <b>Chef Name</b>
                </TableCell>
                <TableCell>
                  <b>Is verified?</b>
                </TableCell>
                <TableCell>
                  <b>Verification Document</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chefs &&
                chefs.map((chef) => (
                  <TableRow key={chef._id}>
                    <TableCell>{chef._id}</TableCell>
                    <TableCell>{chef.name}</TableCell>
                    <TableCell>
                      {chef.chefVerified ? 'Verified' : 'Not verified'}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        <a
                          style={{ color: 'white' }}
                          href={chef.verificationDocument}
                        >
                          View Verification Document
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell>
                      {chef.chefVerified ? (
                        'Already approved'
                      ) : (
                        <Button
                          onClick={() => dispatch(verifyChef(chef._id))}
                          color="primary"
                          variant="contained"
                        >
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminChefs;
