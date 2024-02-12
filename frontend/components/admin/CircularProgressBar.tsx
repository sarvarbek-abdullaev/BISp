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
    <div className="p-5 bg-black flex flex-col justify-center rounded-lg">
      <Link href={path}>
        <div className="flex items-center gap-1">
          <Text>{name}</Text>
          <ExternalLinkIcon />
        </div>
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
    </div>
  );
};
