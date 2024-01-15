'use client';

import { Box, Button, Checkbox, CheckboxGroup, Heading, Stack } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { updateUserGroups } from '@/actions/handleUpdate.action';
import { useRouter } from 'next/navigation';

interface Student {
  id: string;
  name: string;
  isChecked: boolean;
}

interface CheckableContentProps {
  data: {
    students: Student[];
    group: any;
    groupName: string;
  };
  title: string;
  buttonTitle: string;
}

const CheckableContent: FC<CheckableContentProps> = ({ title, buttonTitle, data: dataStudentGroups }) => {
  const { students: fetchedStudents, groupName, group } = dataStudentGroups;
  const groupId = group.id;

  const handleStudentsIds = (students, groupId) => {
    const userIdsSet = new Set();

    students.forEach((student) => {
      const filteredUserGroups = student.userGroups.filter((userGroup) => userGroup.groupId === groupId);

      filteredUserGroups.forEach((userGroup) => {
        userIdsSet.add(userGroup);
      });
    });

    return Array.from(userIdsSet);
  };
  const handleStudents = (students, groupId) => {
    return students.map((student) => {
      const filteredUserGroups = student.userGroups.filter((userGroup) => userGroup.groupId === groupId);
      return {
        ...student,
        isChecked: !!filteredUserGroups.length,
      };
    });
  };

  const defaultStudents = handleStudents(fetchedStudents, groupId);

  const [students, setStudents] = useState(defaultStudents);
  const [selectedStudents, setSelectedStudents] = useState(handleStudentsIds(fetchedStudents, groupId));
  const router = useRouter();

  useEffect(() => {
    if (!groupName) return;

    setStudents(handleStudents(fetchedStudents, groupId));
    setSelectedStudents(handleStudentsIds(fetchedStudents, groupId));
  }, [groupName, fetchedStudents, groupId]);

  const handleCheckboxChange = (studentId: string) => {
    const updatedStudents = students.map((student: any) => {
      if (studentId === student.id) {
        return {
          ...student,
          isChecked: !student.isChecked,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const handleButtonClick = async () => {
    const userGroups =
      students
        .map((student: any) => {
          const currentStatus = defaultStudents.find((defaultStudent) => defaultStudent.id === student.id);
          const defaultStatus = !!currentStatus?.isChecked;
          if (student.isChecked && student.isChecked !== defaultStatus) {
            return {
              userId: student.id,
              groupId: group.id,
            };
          }
        })
        .filter(Boolean) || [];

    const deletedIds =
      students
        .map((student: any) => {
          const currentGroup = selectedStudents.filter((selectedStudent) => selectedStudent.userId === student.id)[0];
          if (!student.isChecked && currentGroup) {
            return currentGroup.id;
          }
        })
        .filter(Boolean) || [];

    console.log(deletedIds);

    try {
      const res = await updateUserGroups('groups/assign', 'user-groups/manage', {
        userGroups,
        deletedIds,
      });
      console.log(res);
      // router.push('/admin/groups/assign');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Heading size="lg" mb="6">
          {title}
        </Heading>
        <CheckboxGroup colorScheme="blue">
          <Stack spacing={[1, 2]} direction="column">
            {students?.map((student: any) => {
              return (
                <Checkbox
                  key={student.id}
                  onChange={() => handleCheckboxChange(student.id)}
                  isChecked={!!student?.isChecked}
                >
                  {student.name}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
      </Box>
      <Button maxW="200px" colorScheme="blue" onClick={handleButtonClick}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default CheckableContent;
