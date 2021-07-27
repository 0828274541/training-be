import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AccountDetails from './Form';
import { categoriesApi } from '../../apis/index';

const CategoryAdd = () => {
  const navigate = useNavigate();
  const onAddCategory = async (title) => {
    const result = await categoriesApi.addCategory({ title });
    if (result.data.code === 200) {
    // message thanh cong
      navigate('/admin/category/list');
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
              <AccountDetails onEventSubmit={onAddCategory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CategoryAdd;
