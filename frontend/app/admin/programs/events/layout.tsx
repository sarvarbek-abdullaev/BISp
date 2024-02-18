import { FC } from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { adminProgramTabs } from '@/tabs';
import { Flex } from '@chakra-ui/react';
import { Wrapper } from '@/components/shared/Wrapper';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
