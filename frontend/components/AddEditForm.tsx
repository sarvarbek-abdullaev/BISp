'use client';
import { Box, Button, Container, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserById } from '@/actions/handleUpdate.action';
import { createUser } from '@/actions/handleCreate.action';

interface AddEditFormProps {
  user?: {
    id: string;
    name: string;
    email: string;
    birthYear: string;
  };
  type: string;
}

const AddEditForm: FC<AddEditFormProps> = ({ user: defaultUserData, type }) => {
  const defaultData = {
    name: defaultUserData?.name || '',
    email: defaultUserData?.email || '',
    birthYear: defaultUserData?.birthYear || '',
    password: '',
  };
  const isEdit = !!defaultUserData;
  const [userData, setUserData] = useState(defaultData);
  const router = useRouter();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const res = await updateUserById(type, defaultUserData?.id, userData);
      if (res?.id) {
        console.log('User updated');
        router.push(`/admin/users/${type}s`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await createUser(type, userData);
      if (res?.id) {
        console.log('User created');
        router.push(`/admin/users/${type}s`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  return (
    <Container maxW="md" ml="0">
      <Stack spacing="8">
        <Box>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" name="name" type="email" required value={userData.name} onChange={handleChanges} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="birthYear">Birth Year</FormLabel>
                <Input
                  id="birthYear"
                  name="birthYear"
                  type="email"
                  required
                  value={userData.birthYear}
                  onChange={handleChanges}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" name="email" type="email" required value={userData.email} onChange={handleChanges} />
              </FormControl>
              {!isEdit && (
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={userData.password}
                    onChange={handleChanges}
                  />
                </FormControl>
              )}
            </Stack>
            <HStack justify="space-between"></HStack>
            <Stack spacing="6">
              <Button onClick={handleSubmit} colorScheme="blue">
                {isEdit ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default AddEditForm;
