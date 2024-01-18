import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import GroupSidebar from '@/app/admin/groups/group-sidebar';
import { Wrapper } from '@/components/Wrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <GroupSidebar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
//
export default AdminLayout;
