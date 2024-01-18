import { Spinner } from '@chakra-ui/spinner';
import { Center, Flex } from '@chakra-ui/react';

export default function LoadingSkeleton() {
  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Spinner thickness="4px" speed="0.6s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );
}
