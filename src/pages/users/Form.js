import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const states = [
  {
    value: 'contributor',
    label: 'contributor'
  },
  {
    value: 'normal',
    label: 'normal'
  }
];

const userDefault = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  role: 'normal'
};

export default function AccountDetails({ onEventSubmit, user }) {
  const [initUser, setUser] = useState(userDefault);
  const location = useLocation();
  const isUpdate = location.pathname.indexOf('update') !== -1;
  const validatePassword = isUpdate ? '' : Yup.string().min(6).max(255).required('Password is required');
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initUser}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          firstName: Yup.string().min(6).max(255).required('firstName is required'),
          lastName: Yup.string().min(6).max(255).required('lastName is required'),
          password: validatePassword,
          role: Yup.string().required('role is required')
        })}
        onSubmit={(values) => {
          onEventSubmit(values.username, values.firstName, values.lastName, values.password, values.role);
        }}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          touched,
          values
        }) => (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Card style={{ backgroundColor: 'black', color: 'white', }}>
              <CardHeader
                title="Profile"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                      fullWidth
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      type="username"
                      value={values.username}
                      variant="outlined"
                      inputProps={{
                        readOnly: Boolean(isUpdate)
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      fullWidth
                      label="First name"
                      name="firstName"
                      onChange={handleChange}
                      type="firstName"
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={handleChange}
                      type="lastName"
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      fullWidth
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.role && errors.role)}
                      helperText={touched.role && errors.role}
                      fullWidth
                      label="Select role"
                      name="role"
                      onChange={handleChange}
                      type="role"
                      select
                      SelectProps={{
                        native: true
                      }}
                      value={values.role}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save details
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
}

AccountDetails.propTypes = {
  onEventSubmit: PropTypes.func,
  user: PropTypes.object,
};
