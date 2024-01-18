import { Center, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface CenteredTextProps {
  text: string;
}

const CenteredText: FC<CenteredTextProps> = ({ text }) => (
  <Center height="100%">
    <Text fontSize="xl">{text}</Text>
  </Center>
);

export default CenteredText;
