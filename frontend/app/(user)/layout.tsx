import { Navbar } from '@/components/admin/Navbar';
import React, { FC } from 'react';
import { adminTabs, userTabs } from '@/tabs';
import { Container } from '@/components/shared/Container';
import { Sidebar } from '@/components/shared/Sidebar';
import { Flex } from '@chakra-ui/react';
import { Wrapper } from '@/components/shared/Wrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Container
        styles={{
          flex: '1',
        }}
      >
        <Navbar tabs={userTabs} />
        <div className="flex h-full px-2">
          <Sidebar tabs={userTabs} />
          <Wrapper>{children}</Wrapper>
        </div>
      </Container>
    </div>
  );
};

export default UserLayout;
