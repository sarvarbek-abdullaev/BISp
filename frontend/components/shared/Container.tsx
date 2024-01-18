import { FC } from 'react';
import { Box } from '@chakra-ui/react';

interface ContainerProps {
  children: React.ReactNode;
  styles?: any;
}

export const Container: FC<ContainerProps> = ({ children, styles }) => {
  return (
    <Box margin="2" {...styles}>
      {children}
    </Box>
  );
};
