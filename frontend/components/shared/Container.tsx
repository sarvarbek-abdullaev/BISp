import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={cn('w-full h-full overflow-y-auto flex-1', className)}>{children}</div>;
};
