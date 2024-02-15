import React, { FC } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';
import EnrollmentSidebar from '@/app/admin/enrollments/enrollment-sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <EnrollmentSidebar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
//
export default AdminLayout;
