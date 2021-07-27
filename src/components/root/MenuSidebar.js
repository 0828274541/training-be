import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut as LogOutIcon,
  List as ListIcon,
  Bookmark as BookmarkIcon,
  Book as BookIcon,
  Trello as TrelloIcon,
  Tool as ToolIcon,
  UserCheck as UserCheckIcon,
  Tv as TvIcon
} from 'react-feather';

export const user = {
  avatar: '/static/images/avatars/1aaaaa.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

export const items = [
  // User
  {
    icon: UserCheckIcon,
    title: 'User',
    children: [
      {
        title: 'User List',
        href: '/admin/user/list',
        icon: ListIcon
      },
      {
        title: 'User Add',
        href: '/admin/user/add',
        icon: UserPlusIcon
      }
    ]
  },
  // Book
  {
    icon: BarChartIcon,
    title: 'Book',
    children: [
      {
        title: 'Book List',
        href: '/admin/book/list',
        icon: BookmarkIcon
      },
      {
        title: 'Book Add',
        href: '/admin/book/add',
        icon: BookIcon
      }
    ]
  },
  // Cateogry
  {
    icon: TvIcon,
    title: 'Category',
    children: [
      {
        title: 'Category List',
        href: '/admin/category/list',
        icon: TrelloIcon
      },
      {
        title: 'Category Add',
        href: '/admin/category/add',
        icon: ToolIcon
      }
    ]
  },
  {
    href: '/admin/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/admin/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/admin/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/admin/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/logout',
    icon: LogOutIcon,
    title: 'Logout'
  }
];

export default {
  user, items
};
