import React, { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
  return <>{children}</>;
};

export default AdminLayout;
