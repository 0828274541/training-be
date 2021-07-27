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

const cateogryDefault = {
  title: '',
};

export default function AccountDetails({ onEventSubmit, category }) {
  const [initCategory, setCatehory] = useState(cateogryDefault);
  useEffect(() => {
    if (category) {
      setCatehory(category);
    }
  }, [category]);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initCategory}
        validationSchema={Yup.object().shape({
          title: Yup.string().min(6).max(255).required('Title is required'),
        })}
        onSubmit={(values) => {
          onEventSubmit(values.title);
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
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      fullWidth
                      label="Title"
                      name="title"
                      onChange={handleChange}
                      type="title"
                      value={values.title}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
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
  category: PropTypes.object,
};
