import { FC, ReactNode } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';

interface UsersLayoutProps {
  children: ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return <Wrapper className="flex-1">{children}</Wrapper>;
};

export default UsersLayout;
