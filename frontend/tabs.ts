export const columns = ['No', 'Name', 'Email', 'Birth Year', 'Date Added', 'Actions'];

export const studentColumns = ['No', 'Name', 'Email', 'Birth Year', 'Date Added', 'Group', 'Actions'];

export const groupColumns = ['No', 'Name', 'Course', 'Year', 'Created At', 'Members', 'Actions'];

export const userTabs = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Profile',
    path: '/profile',
  },
  {
    name: 'TimeTable',
    path: '/timetable',
  },
  {
    name: 'Events',
    path: '/events',
  },
  {
    name: 'Settings',
    path: '/settings',
  },
];

export const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin',
  },
  {
    name: 'Users',
    path: '/admin/users',
  },
  {
    name: 'Groups',
    path: '/admin/groups',
  },
  {
    name: 'Settings',
    path: '/admin/settings',
  },
];

export const adminUsersTabs = [
  {
    name: 'Dashboard',
    path: '/admin/users',
  },
  {
    name: 'Students',
    path: '/admin/users/student',
  },
  {
    name: 'Teachers',
    path: '/admin/users/teachers',
  },
  {
    name: 'Admins',
    path: '/admin/users/admins',
  },
];
