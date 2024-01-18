import { FC } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { adminProgramTabs } from '@/tabs';
import { Flex } from '@chakra-ui/react';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar tabs={adminProgramTabs} />
      {children}
    </>
  );
};

export default UsersLayout;
