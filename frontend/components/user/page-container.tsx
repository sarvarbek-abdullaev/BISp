import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}
const PageContainer: FC<PageContainerProps> = ({ children, title, className }) => {
  return (
    <div className={cn('p-10', className)}>
      <h1 className="text-4xl font-mono mb-10">{title}</h1>
      {children}
    </div>
  );
};

export default PageContainer;
