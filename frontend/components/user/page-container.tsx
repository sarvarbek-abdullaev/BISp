import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}
const PageContainer: FC<PageContainerProps> = ({ children, title, className }) => {
  return (
    <div className={cn('p-6 md:p-8 lg:p-10', className)}>
      <h1 className="text-2xl mb-3 font-mono md:text-3xl md:mb-5 lg:text-4xl lg:mb-10">{title}</h1>
      {children}
    </div>
  );
};

export default PageContainer;
