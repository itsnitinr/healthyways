import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { verifyAccount } from '../../redux/user/user.actions';

const VerifyAccountPage = ({ history }) => {
  const { loading, success } = useSelector((state) => state.userVerify);

  const dispatch = useDispatch();

  const verificationToken = useParams().verificationToken;

  useEffect(() => {
    if (success) {
      history.push('/home');
    } else {
      dispatch(verifyAccount(verificationToken));
      history.push('/home');
    }
  }, [success, dispatch, history, verificationToken]);

  return (
    <>
      {loading && (
        <CircularProgress
          style={{ display: 'block', height: '100%', width: '100%' }}
        />
      )}
    </>
  );
};

export default VerifyAccountPage;
