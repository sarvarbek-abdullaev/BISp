'use client';
import { Box, Button, Container, FormControl, FormLabel, HStack, Input, Select, Stack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateModuleById } from '@/actions/handleUpdate.action';
import { Course, Module } from '@/utils/interfaces';
import { createModule } from '@/actions/handleCreate.action';

interface AddEditFormProps {
  module?: Module;
  courses: Course[];
  type: string;
}

const AddEditModuleForm: FC<AddEditFormProps> = ({ module, courses, type }) => {
  const defaultData: Module = {
    name: module?.name || '',
    code: module?.code || '',
    description: module?.description || '',
    courseId: module?.courseId || '',
    course: module?.course,
  };

  const isEdit = !!module;

  const [data, setData] = useState<Module>(defaultData);
  const router = useRouter();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      return await updateModuleById(module?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async () => {
    try {
      return await createModule(type, data);
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
    {
      label: 'Course',
      name: 'courseId',
      type: 'dropdown',
      required: true,
      value: data.courseId,
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
                      {courses.map((course: any) => (
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
                      onChange={handleChanges}
                      {...(element.type === 'textarea' && {
                        as: 'textarea',
                        height: 'auto',
                      })}
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

export default AddEditModuleForm;
