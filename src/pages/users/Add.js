import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AccountDetails from './Form';
import { usersApi } from '../../apis';

// const initUser = {
//   username: 'admin',
//   firstName: '123',
//   lastName: '',
//   password: '',
//   role: 'normal',
// };
const UserAdd = () => {
  const navigate = useNavigate();
  const onAddUser = async (firstName, lastName, username, password, role) => {
    const result = await usersApi.addUser({
      firstName,
      lastName,
      username,
      password,
      roleCreate: role
    });
    if (result.data.code === 200) {
    // message thanh cong
      navigate('/admin/user/list');
    } else {
    // message fail
    }
  };
  return (
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            marginTop="20px"
          >
            <Grid
              item
              lg={8}
              md={8}
              xs={8}
            >
              <AccountDetails onEventSubmit={onAddUser} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserAdd;
