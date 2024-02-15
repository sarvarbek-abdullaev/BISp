import React, { FC } from 'react';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default UsersLayout;
