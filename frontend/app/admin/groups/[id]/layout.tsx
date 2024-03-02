import React, { FC } from 'react';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/shared/Wrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <GroupSidebar />
      <Wrapper className="flex-1">{children}</Wrapper>
    </>
  );
};
//
export default AdminLayout;
