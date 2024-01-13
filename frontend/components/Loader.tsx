import { Spinner } from '@chakra-ui/spinner';
import { Center } from '@chakra-ui/react';

export default function LoadingSkeleton() {
  return (
    <Center height="100vh" width="100%">
      <Spinner thickness="4px" speed="0.6s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Center>
  );
}
