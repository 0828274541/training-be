import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const data = {
      username: null,
      token: null,
      role: null
    };
    dispatch({ type: 'SET_LOGIN', payload: data });
  };
  handleLogout();
  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default Logout;
