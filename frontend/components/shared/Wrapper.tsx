import { FC, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  flex?: string;
  padding?: string;
  width?: string;
}

export const Wrapper: FC<WrapperProps> = ({ children, flex, padding = '5', width = '90%' }) => {
  return (
    <div
      className="flex flex-col mx-10 px-5 py-2 rounded-lg overflow-hidden bg-[#202020] overflow-y-auto"
      style={{ flex, padding, width }}
    >
      {children}
    </div>
  );
};
