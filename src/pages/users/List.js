import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { debounce } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Label from '../../components/Label';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from './tableList';

//
import { usersApi } from '../../apis/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'firstName', label: 'Firstname', alignRight: false },
  { id: 'lastName', label: 'Lastname', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' }
];

export default function User() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('-');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('_id');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [keyWord, setKeyword] = useState('');
  const [loadpage, setLoadPage] = useState(true);

  async function getUser() {
    const result = await usersApi.paging({
      search: keyWord,
      page,
      limit: rowsPerPage,
      sort_column: orderBy,
      sort_direction: order
    });
    if (result.data.code === 200) {
      const {
        docs: userList, limit, page: pageReturn, totalDocs
      } = result.data.users;
      if (userList.length) {
        setPage(pageReturn);
        setRowsPerPage(limit);
        setTotalPage(totalDocs);
        setUsers(userList);
      } else {
        setUsers([]);
        setTotalPage(totalDocs);
      }
    }
  }
  async function handleListDelete() {
    const result = await usersApi.deleteUser({
      userIds: selected,
    });
    if (result.data.code === 200) {
      // delelte all success
      getUser();
      setSelected([]);
    }
  }

  async function handleItemDelete(id) {
    const result = await usersApi.deleteUser({
      userIds: [`${id}`],
    });
    if (result.data.code === 200) {
      // delelte item success
      getUser();
      setSelected([]);
    }
  }

  useEffect(() => {
    getUser();
  }, [loadpage]);

  const debounceLoadData = useCallback(debounce((isloadpage) => {
    setPage(1);
    setRowsPerPage(5);
    setLoadPage(isloadpage);
  }, 1000), []);

  // ham get value search (filtername)
  const handleKeyword = (event) => {
    const val = event.target.value;
    setKeyword(val);
    debounceLoadData(!loadpage);
  };

  const isUserNotFound = users.length === 0;

  const handleRequestSort = (event, property) => {
    if (property === 'role' || isUserNotFound) {
      return;
    }
    const isAsc = orderBy === property && order === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
    setSelected([]);
    setLoadPage(!loadpage);
  };

  const handleSelectAllClick = (event) => {
    if (isUserNotFound) {
      return;
    }
    if (event.target.checked) {
      const newSelecteds = users.map((row) => {
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
  // thay doi page
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    setSelected([]);
    setLoadPage(!loadpage);
  };
  // thay doi per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setLoadPage(!loadpage);
  };
  return (
    <>
      <Page title="User | Minimal-UI">
        <Container sx={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/admin/user/add"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>

          <Card style={{ backgroundColor: 'black', color: 'white', }}>
            <UserListToolbar
              numSelected={selected.length}
              keyWord={keyWord}
              onKeyWord={handleKeyword}
              onDeleteList={handleListDelete}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, minHeight: 440 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {users
                      .map((row) => {
                        const {
                          _id, username, role, firstName, lastName
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
                            <TableCell align="left" width="25%">{username}</TableCell>
                            <TableCell align="left" width="25%">{firstName}</TableCell>
                            <TableCell align="left" width="25%">{lastName}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                              // eslint-disable-next-line no-nested-ternary
                                color={role[0] === 'admin' ? 'success' : role[0] === 'contributor' ? 'warning' : 'info'}
                              >
                                {sentenceCase(role[0])}
                              </Label>
                            </TableCell>
                            <TableCell align="right">
                              <UserMoreMenu id={_id} pageUpdate={page} onDeleteItem={handleItemDelete} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={keyWord} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            {!isUserNotFound && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              page={page - 1}
              count={totalPage}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            )}
          </Card>
        </Container>
      </Page>
    </>
  );
}
