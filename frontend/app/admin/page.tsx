import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

interface AdminPageProps {
  children: React.ReactNode;
}

const AdminPage: FC<AdminPageProps> = ({ children }) => {
  return (
    <Flex>
      {children}
    </Flex>
  )
};

export default AdminPage;
