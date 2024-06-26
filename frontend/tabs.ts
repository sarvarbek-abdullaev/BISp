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

export const orderColumns = ['No', 'Name', 'Subtotal', 'Products', 'Status', 'Date Created', 'Actions'];

export const attendanceColumns = ['No', 'Class', 'Status', 'Created', 'Time'];

export const timetableColumns = ['No', 'Group', 'Modules', 'Hours', 'Created At', 'Actions'];

export const moduleAttendanceColumns = ['No', 'Name', 'Group'];

export const moduleAssessColumns = ['No', 'Name', 'Group'];

export const userTabs = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Marks',
    path: '/marks',
  },
  {
    name: 'Attendance',
    path: '/attendance',
  },
  {
    name: 'E-commerce',
    path: '/e-commerce',
  },
  {
    name: 'TimeTable',
    path: '/timetable',
  },
  {
    name: 'Events',
    path: '/events',
  },
];

export const adminTabs = [
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
    name: 'TimeTable',
    path: '/admin/timetable',
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
    path: '/admin/users?type=students',
  },
  {
    name: 'Teachers',
    path: '/admin/users?type=teachers',
  },
  {
    name: 'Admins',
    path: '/admin/users?type=admins',
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
    path: '/admin/e-commerce',
  },
  {
    name: 'Products',
    path: '/admin/e-commerce/products',
  },
  {
    name: 'Orders',
    path: '/admin/e-commerce/orders',
  },
];
