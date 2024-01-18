import { Sidebar } from '@/components/Sidebar';
import { adminUsersTabs } from '@/tabs';
import { FC } from 'react';
import { Wrapper } from '@/components/Wrapper';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default UsersLayout;
