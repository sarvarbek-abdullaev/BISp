import { Sidebar } from '@/components/Sidebar';
import { adminUsersTabs } from '@/tabs';
import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar tabs={adminUsersTabs} />
      <Flex direction="column" p="5" w="90%" marginX="10" bg="#202020" borderRadius="8px" overflow="hidden">
        {children}
      </Flex>
    </>
  );
};

export default UsersLayout;
