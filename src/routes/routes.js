import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/root/DashboardLayout';
import MainLayout from 'src/components/root/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import Logout from 'src/pages/Logout';
import NotFound from 'src/pages/NotFound';
import Forbidden from 'src/pages/Forbidden';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import UserList from 'src/pages/users/List';
import UserUpdate from 'src/pages/users/Update';
import UserAdd from 'src/pages/users/Add';
import CategoryList from 'src/pages/categories/List';
import CategoryUpdate from 'src/pages/categories/Update';
import CategoryAdd from 'src/pages/categories/Add';
import BookList from 'src/pages/books/List';
import BookUpdate from 'src/pages/books/Update';
import BookAdd from 'src/pages/books/Add';

const routes = (isLoggedIn) => [
  {
    path: '/admin',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'user/list', element: <UserList /> },
      { path: 'user/add', element: <UserAdd /> },
      { path: 'user/update/:id', element: <UserUpdate /> },
      { path: 'book/list', element: <BookList /> },
      { path: 'book/add', element: <BookAdd /> },
      { path: 'book/update/:id', element: <BookUpdate /> },
      { path: 'category/list', element: <CategoryList /> },
      { path: 'category/add', element: <CategoryAdd /> },
      { path: 'category/update/:id', element: <CategoryUpdate /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'logout', element: <Logout /> },
      { path: 'login', element: !isLoggedIn ? <Login /> : <Navigate to="/admin" /> },
      { path: 'register', element: !isLoggedIn ? <Register /> : <Navigate to="/admin" /> },
      { path: '404', element: <NotFound /> },
      { path: '403', element: <Forbidden /> },
      { path: '', element: <Navigate to="/admin" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
