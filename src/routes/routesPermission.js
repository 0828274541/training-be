const authorize = [
  {
    role: 'normal',
    pathname: [
      '/register',
      '/login',
      '/logout',
      '/404',
      '/403',
      '/'
    ]
  },
  {
    role: 'contributor',
    pathname: [
      '/register',
      '/logout',
      '/login',
      '/admin',
      '/admin/account',
      '/admin/customers',
      '/admin/products',
      '/admin/book/list',
      '/admin/book/add',
      '/admin/book/update',
      '/404',
      '/403',
      '/'
    ]
  },
];
const routesPermission = (pathname, role) => {
  if (role === 'admin') {
    return true;
  }
  if (pathname && role) {
    const isPermission = authorize.find((item) => item.role === role)
      .pathname.includes(pathname);
    return isPermission;
  }
  return true;
};

export default routesPermission;
