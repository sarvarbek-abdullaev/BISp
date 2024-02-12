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
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar tabs={adminTabs} />
      <Container
        styles={{
          flex: '1',
        }}
      >
        <div className="flex h-full px-2">{children}</div>
      </Container>
    </div>
  );
};

export default AdminLayout;
