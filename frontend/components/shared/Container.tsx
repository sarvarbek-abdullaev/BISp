import { FC } from 'react';
import { Box } from '@chakra-ui/react';

interface ContainerProps {
  children: React.ReactNode;
  styles?: any;
}

export const Container: FC<ContainerProps> = ({ children, styles }) => {
  return (
    <div className="m-2 w-full h-full" {...styles}>
      {children}
    </div>
  );
};
