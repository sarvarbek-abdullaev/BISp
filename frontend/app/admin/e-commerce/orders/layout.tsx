import { FC } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return <Wrapper className="flex-1">{children}</Wrapper>;
};

export default UsersLayout;
