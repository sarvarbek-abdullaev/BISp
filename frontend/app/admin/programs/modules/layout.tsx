import { FC, ReactNode } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <Wrapper className="flex-1">{children}</Wrapper>;
};

export default Layout;
