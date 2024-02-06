import { Sidebar } from '@/components/shared/Sidebar';
import { adminUsersTabs } from '@/tabs';
import { FC } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default UsersLayout;