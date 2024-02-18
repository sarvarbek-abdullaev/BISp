export const columns = ['No', 'First name', 'Last name', 'Email', 'Birth Year', 'Date Added', 'Actions'];

export const studentColumns = [
  'No',
  'First name',
  'Last name',
  'Email',
  'Birth Year',
  'Date Added',
  'Group',
  'Actions',
];

export const groupColumns = ['No', 'Name', 'Course', 'Year', 'Created At', 'Members', 'Actions'];

export const moduleColumns = ['No', 'Code', 'Name', 'Course', 'Created At', 'Actions'];
export const courseColumns = ['No', 'Code', 'Name', 'Modules', 'Created At', 'Actions'];

export const eventColumns = ['No', 'Name', 'Module', 'Start Date', 'End Date', 'Created At', 'Actions'];

export const enrollmentColumns = ['No', 'Student', 'Course', 'Status', 'Date Created', 'Actions'];

export const examColumns = ['No', 'Name', 'Module', 'Course', 'Date', 'Actions'];

export const productColumns = ['No', 'Name', 'Price', 'Status', 'Image', 'Date Created', 'Actions'];

export const userTabs = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'My Groups',
    path: '/groups',
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
    name: 'Programs',
    path: '/admin/programs',
  },
  {
    name: 'Enrollments',
    path: '/admin/enrollments',
  },
  {
    name: 'E-commerce',
    path: '/admin/e-commerce',
  },
];

export const adminUsersTabs = [
  {
    name: 'Dashboard',
    path: '/admin/users',
  },
  {
    name: 'Students',
    path: '/admin/users/students',
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

export const adminProgramTabs = [
  {
    name: 'Dashboard',
    path: '/admin/programs',
  },
  {
    name: 'Courses',
    path: '/admin/programs/courses',
  },
  {
    name: 'Modules',
    path: '/admin/programs/modules',
  },
  {
    name: 'Exams',
    path: '/admin/programs/exams',
  },
  {
    name: 'Events',
    path: '/admin/programs/events',
  },
];

export const adminEcommerceTabs = [
  {
    name: 'Dashboard',
    path: '/admin/programs/e-commerce',
  },
  {
    name: 'Products',
    path: '/admin/programs/products',
  },
  // {
  //   name: 'Orders',
  //   path: '/admin/programs/orders',
  // },
];
