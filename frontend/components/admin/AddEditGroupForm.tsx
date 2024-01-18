'use client';
import { Box, Button, Container, FormControl, FormLabel, HStack, Input, Select, Stack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGroupById } from '@/actions/handleUpdate.action';
import { createGroup } from '@/actions/handleCreate.action';
import { Course } from '@/components/admin/Table';

interface AddEditFormProps {
  data: {
    group?: {
      id: string;
      name: string;
      course: Course;
      year: number;
    };
    courses: {
      id: string;
      name: string;
      code: string;
    }[];
  };
  type: string;
}

const AddEditUserForm: FC<AddEditFormProps> = ({ data: defaultUserData, type }) => {
  const defaultData = {
    name: defaultUserData.group?.name || '',
    courseId: defaultUserData.group?.course?.id || '',
    year: defaultUserData.group?.year || '',
  };
  const isEdit = !!defaultUserData?.group;
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const res = await updateGroupById(type, defaultUserData?.group?.id, data);
      if (res?.id) {
        console.log(`${type} updated`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await createGroup(type, data);
      if (res?.id) {
        console.log(`${type} created`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    // @ts-ignore
    data.courseId === '' && delete data.courseId;
    isEdit ? await handleUpdate() : await handleCreate();
    const courseCode = defaultUserData?.courses?.find((course) => course.id === data.courseId)?.code || 'all';
    router.push(`/admin/${type}?courseCode=${courseCode}`);
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
      label: 'Course',
      name: 'courseId',
      type: 'dropdown',
      required: true,
      value: data.courseId,
    },
    {
      label: 'Year',
      name: 'year',
      type: 'number',
      required: true,
      value: data.year,
      disabled: isEdit,
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
                  {element.type === 'dropdown' ? (
                    <Select
                      id={element.name}
                      name={element.name}
                      placeholder={`Select ${element.label}`}
                      required={element.required}
                      value={element.value}
                      onChange={handleChanges}
                      bg={'#202020'}
                      sx={{
                        '> option': {
                          background: '#202020',
                        },
                      }}
                    >
                      {defaultUserData?.courses?.map((course: any) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      id={element.name}
                      name={element.name}
                      type={element.type}
                      required={element.required}
                      value={element.value}
                      disabled={element.disabled}
                      onChange={handleChanges}
                    />
                  )}
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

export default AddEditUserForm;
