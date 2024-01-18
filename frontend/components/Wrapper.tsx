import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  flex?: string;
  padding?: string;
  width?: string;
}

export const Wrapper: FC<WrapperProps> = ({ children, flex, padding = '5', width = '90%' }) => {
  return (
    <Flex
      direction="column"
      p={padding}
      w={width}
      marginX="10"
      bg="#202020"
      borderRadius="8px"
      flex={flex}
      overflow="hidden"
    >
      {children}
    </Flex>
  );
};
