'use client';
import { Box, ChakraProps, CircularProgress, CircularProgressLabel, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Link from '@/components/shared/Link';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface CircularProgressBarProps {
  text: string;
  value: number;
  maxValue?: number;
  color?: string;
  path: string;
  name: string;
}

export const CircularProgressBar: FC<CircularProgressBarProps> = ({ text, value, maxValue, color, path, name }) => {
  return (
    <Box p="5" bg="black" justifyContent="center" borderRadius="20">
      <Link href={path}>
        <Flex alignItems="center" gap="1">
          <Text>{name}</Text>
          <ExternalLinkIcon />
        </Flex>
      </Link>
      <CircularProgress
        display="flex"
        justifyContent="center"
        capIsRound={true}
        isIndeterminate={false}
        size={230}
        min={0}
        max={maxValue}
        value={value}
        color={color}
      >
        <CircularProgressLabel fontSize={40}>{text}</CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};
