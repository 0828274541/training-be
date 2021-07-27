import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer
} from '@material-ui/core';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from './tableList';

//
import { categoriesApi } from '../../apis/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: '' }
];

export default function Category() {
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getCategory() {
    const result = await categoriesApi.getCategory();
    if (result.data.code === 200) {
      const { docs: categoriesData } = result.data.categories;
      if (categoriesData.length) {
        setCategories(categoriesData);
      } else {
        setCategories([]);
      }
    }
  }
  async function handleListDelete() {
    const result = await categoriesApi.deleteCategory({
      categoryIds: selected,
    });
    if (result.data.code === 200) {
      // delelte all success
      getCategory();
      setSelected([]);
    }
  }

  async function handleItemDelete(id) {
    const result = await categoriesApi.deleteCategory({
      categoryIds: [`${id}`],
    });
    if (result.data.code === 200) {
      // delelte item success
      getCategory();
      setSelected([]);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  const isUserNotFound = categories.length === 0;

  const handleSelectAllClick = (event) => {
    if (isUserNotFound) {
      return;
    }
    if (event.target.checked) {
      const newSelecteds = categories.map((row) => {
        const {
          _id: id,
        } = row;
        return id;
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // select row
  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  return (
    <>
      <Page title="Category | Minimal-UI">
        <Container sx={{ marginTop: '20px' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/admin/category/add"
              startIcon={<Icon icon={plusFill} />}
            >
              New Category
            </Button>
          </Stack>

          <Card style={{ backgroundColor: 'black', color: 'white', }}>
            <UserListToolbar
              numSelected={selected.length}
              onDeleteList={handleListDelete}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, minHeight: 440 }}>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={categories.length}
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {categories
                      .map((row) => {
                        const {
                          _id, title
                        } = row;
                        const isItemSelected = selected.indexOf(_id) !== -1;
                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, _id)}
                              />
                            </TableCell>
                            <TableCell align="left" width="25%">{title}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu id={_id} onDeleteItem={handleItemDelete} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery="DATA NOT FOUND" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Container>
      </Page>
    </>
  );
}
