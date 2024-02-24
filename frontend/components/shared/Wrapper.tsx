import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WrapperProps {
  children: ReactNode;
  flex?: string;
  padding?: string;
  width?: string;
  className?: string;
}

export const Wrapper: FC<WrapperProps> = ({ children, className, flex, padding, width }) => {
  return (
    <div
      className={cn(
        'flex flex-col md:mx-10 md:px-5 md:py-2 rounded-lg overflow-hidden bg-[#202020] overflow-y-auto flex-1',
        flex && `flex-${flex}`,
        padding && `p-${padding}`,
        width && `w-${width}`,
        className,
      )}
    >
      {children}
    </div>
  );
};
