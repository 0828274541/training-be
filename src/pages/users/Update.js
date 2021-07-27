import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountDetails from './Form';
import { usersApi } from '../../apis';

const UserUpdate = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const onUpdateUser = async (username, lastName, firstName, password, role) => {
    console.log(username, lastName, firstName, password, role);
    const result = await usersApi.updateUser({
      username,
      firstName,
      lastName,
      password,
      roleUpdate: role,
      id
    });
    if (result.data.code === 200) {
    // message thanh cong
      navigate('/admin/user/list');
    } else {
    // message fail
    }
  };
  async function getUserById() {
    const result = await usersApi.getUserById({
      id
    });
    if (result.data.code === 200) {
      setUser({
        username: result.data.users.username,
        firstName: result.data.users.firstName,
        lastName: result.data.users.lastName,
        password: '',
        role: result.data.users.role[0],
      });
    } else {
      console.log('data not found');
    }
  }

  useEffect(() => {
    getUserById();
  }, []);
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
              <AccountDetails onEventSubmit={onUpdateUser} user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserUpdate;
