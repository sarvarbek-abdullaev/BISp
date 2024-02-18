import { Sidebar } from '@/components/shared/Sidebar';
import { FC } from 'react';
import { adminEcommerceTabs } from '@/tabs';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar tabs={adminEcommerceTabs} />
      {children}
    </>
  );
};

export default UsersLayout;
