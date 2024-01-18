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
    <>
      <Flex flexDirection="column" height="100vh" overflow="hidden">
        <Container
          styles={{
            flex: '1',
          }}
        >
          <Flex height="100%" paddingY="4">
            <Sidebar tabs={userTabs} />
            <Wrapper>{children}</Wrapper>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default UserLayout;
