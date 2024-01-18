import { Navbar } from '@/components/Navbar';
import React, { FC } from 'react';
import { userTabs } from '@/tabs';
import { Container } from '@/components/Container';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar tabs={userTabs} />
      <Container>{children}</Container>
    </>
  );
};

export default UserLayout;
