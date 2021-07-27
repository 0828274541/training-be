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
import { categoriesApi } from '../../apis';
import MyDropzone from './MyDropzone';

const bookDefault = {
  title: '',
  description: '',
  author: '',
  cover: '',
  category: { _id: '0', title: '--Chon danh muc--' }
};

export default function BookDetails({ onEventSubmit, book }) {
  const [initBook, setBook] = useState(bookDefault);
  const [categories, setCategories] = useState([{}]);
  const [cover, setCover] = useState([]);

  async function getCategory() {
    const result = await categoriesApi.getCategory();
    if (result.data.code === 200) {
      const { docs: categoriesData } = result.data.categories;
      if (categoriesData.length) {
        const categorySelect = categoriesData.map((item) => ({ value: item._id, label: item.title }));
        categorySelect.unshift({ value: '0', label: '--Chon danh muc--' });
        setCategories(categorySelect);
      }
    }
  }
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    if (book) {
      setBook(book);
    }
  }, [initBook]);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initBook}
        validationSchema={Yup.object().shape({
          title: Yup.string().min(6).max(255).required('title is required'),
          description: Yup.string().min(6).max(255).required('description is required'),
          author: Yup.string().min(6).max(255).required('author is required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          onEventSubmit(values.title, values.description, values.author, values.category._id, cover);
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
                      label="title"
                      name="title"
                      onChange={handleChange}
                      type="title"
                      value={values.title}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      fullWidth
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      type="description"
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.author && errors.author)}
                      helperText={touched.author && errors.author}
                      fullWidth
                      label="Last name"
                      name="author"
                      onChange={handleChange}
                      type="author"
                      value={values.author}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                      fullWidth
                      label="Select category"
                      name="category._id"
                      onChange={handleChange}
                      type="category._id"
                      select
                      SelectProps={{
                        native: true
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.category._id}
                      variant="outlined"
                    >
                      {categories.map((option, index) => (
                        <option
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <MyDropzone setCover={setCover} />
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

BookDetails.propTypes = {
  onEventSubmit: PropTypes.func,
  book: PropTypes.object,
};
