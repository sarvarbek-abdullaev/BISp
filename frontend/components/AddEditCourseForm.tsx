'use client';
import { Box, Button, Container, FormControl, FormLabel, HStack, Input, Stack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourseById } from '@/actions/handleUpdate.action';
import { Course } from '@/utils/interfaces';
import { createCourse } from '@/actions/handleCreate.action';

interface AddEditFormProps {
  course?: Course;
  type: string;
}

const AddEditCourseForm: FC<AddEditFormProps> = ({ course, type }) => {
  const defaultData: Course = {
    name: course?.name || '',
    code: course?.code || '',
    description: course?.description || '',
    modules: course?.modules || [],
  };

  const isEdit = !!course;

  const [data, setData] = useState<Course>(defaultData);
  const router = useRouter();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      return await updateCourseById(course?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async () => {
    try {
      return await createCourse(type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const res = isEdit ? await handleUpdate() : await handleCreate();
    router.push(`/admin/programs/${type}/${res.id}`);
  };

  const formElements = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      required: true,
      value: data.name,
    },
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      required: true,
      value: data.code,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'textarea',
      required: true,
      value: data.description,
    },
  ];

  return (
    <Container maxW="md" ml="0">
      <Stack spacing="8">
        <Box>
          <Stack spacing="6">
            <Stack spacing="5">
              {formElements.map((element, index) => (
                <FormControl key={element.type + index}>
                  <FormLabel htmlFor={element.name}>{element.label}</FormLabel>
                  <Input
                    id={element.name}
                    name={element.name}
                    type={element.type}
                    required={element.required}
                    value={element.value}
                    onChange={handleChanges}
                    {...(element.type === 'textarea' && {
                      as: 'textarea',
                      height: 'auto',
                    })}
                  />
                </FormControl>
              ))}
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

export default AddEditCourseForm;
