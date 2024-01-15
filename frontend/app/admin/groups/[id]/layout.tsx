import React, { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import GroupSidebar from '@/app/admin/groups/group-sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
  return (
    <>
      <GroupSidebar />
      <Flex direction="column" p="5" w="90%" marginX="10" bg="#202020" borderRadius="8px" overflow="hidden">
        {children}
      </Flex>
    </>
  );
};
//
export default AdminLayout;
