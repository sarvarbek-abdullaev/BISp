import React, { FC } from 'react';
import { Navbar } from '@/components/admin/Navbar';
import { adminTabs } from '@/tabs';
import { Flex } from '@chakra-ui/react';
import { Container } from '@/components/shared/Container';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" height="100vh" overflow="hidden">
      <Navbar tabs={adminTabs} />
      <Container
        styles={{
          flex: '1',
        }}
      >
        <Flex height="100%" paddingY="4">
          {children}
        </Flex>
      </Container>
    </Flex>
  );
};

export default AdminLayout;
