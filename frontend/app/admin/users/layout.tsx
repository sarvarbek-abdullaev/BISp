import { Sidebar } from '@/components/shared/Sidebar';
import { adminUsersTabs } from '@/tabs';
import { FC } from 'react';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar tabs={adminUsersTabs} />
      {children}
    </>
  );
};

export default UsersLayout;
