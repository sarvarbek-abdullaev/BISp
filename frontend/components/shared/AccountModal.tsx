import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Popover } from '@/components/shared/Popover';
import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';

export const AccountModal = () => {
  const { data: session } = useSession();

  return (
    <Popover
      element={<MdAccountCircle size="40px" color="#B0B0B0" />}
      header={
        <Flex gap="2">
          <Avatar size="md" name={session?.user?.name || 'Name'} src="https://bit.ly/dan-abramov" />
          <Box>
            <Box fontWeight="semibold">{session?.user?.name}</Box>
            <Box fontSize="sm">{session?.user?.email}</Box>
            <Box fontSize="x-small" mt="1">
              {session?.user?.role}
            </Box>
          </Box>
        </Flex>
      }
      body={
        <>
          <Button colorScheme="whiteAlpha" variant="ghost" width="100%">
            <Link style={{ textAlign: 'left', width: '100%' }} href="/profile">
              My Profile
            </Link>
          </Button>
          <Divider marginY="2" />
          <Button colorScheme="whiteAlpha" variant="ghost" width="100%" onClick={() => signOut()}>
            <Text style={{ textAlign: 'left', width: '100%' }}>Logout</Text>
          </Button>
        </>
      }
    />
  );
};
