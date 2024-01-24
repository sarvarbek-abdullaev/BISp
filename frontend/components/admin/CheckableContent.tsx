'use client';

import { Button, Checkbox, CheckboxGroup, Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
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
  availableTitle: string;
  currentTitle: string;
  buttonTitle: string;
}

const CheckableContent: FC<CheckableContentProps> = ({
  availableTitle,
  currentTitle,
  buttonTitle,
  data: dataStudentGroups,
}) => {
  const { students: fetchedStudents, groupName, group } = dataStudentGroups;
  const groupId = group.id;
  // @ts-ignore
  const handleStudentsIds = (students, groupId) => {
    // @ts-ignore
    const userIdsSet = new Set();

    // @ts-ignore
    students.forEach((student) => {
      // @ts-ignore
      const filteredUserGroups = student.userGroups.filter((userGroup) => userGroup?.group?.id === groupId);
      // @ts-ignore
      filteredUserGroups.forEach((userGroup) => {
        userIdsSet.add(userGroup);
      });
    });

    return Array.from(userIdsSet);
  };
  // @ts-ignore
  const handleStudents = (students, groupId) => {
    // @ts-ignore
    return students.map((student) => {
      // @ts-ignore
      const filteredUserGroups = student.userGroups.filter((userGroup) => userGroup?.group?.id === groupId);
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
          //  @ts-ignore
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

    const deletedIds = students
      .map((student: any) => {
        // @ts-ignore
        const currentGroup = selectedStudents.filter((selectedStudent) => selectedStudent.userId === student.id)[0];
        if (!student.isChecked && currentGroup) {
          // @ts-ignore
          return currentGroup.id;
        }
      })
      .filter(Boolean);

    try {
      const res = await updateUserGroups('groups/assign', 'user-groups/manage', {
        userGroups,
        deletedIds,
      });
      router.push(`/admin/groups/${groupId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // @ts-ignore
  const CheckBoxes = ({ students, filterSelected }) => {
    return (
      <CheckboxGroup colorScheme="blue">
        <Stack spacing={[1, 2]} direction="column">
          {students?.map((student: Student) => {
            if (student.isChecked === filterSelected) return;

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
    );
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap="1">
        <GridItem>
          <Heading size="lg" mb="6">
            {currentTitle}
          </Heading>
          <CheckBoxes students={students} filterSelected={false} />
        </GridItem>
        <GridItem>
          <Heading size="lg" mb="6">
            {availableTitle}
          </Heading>
          <CheckBoxes students={students} filterSelected={true} />
        </GridItem>
      </Grid>
      <Button maxW="200px" colorScheme="blue" onClick={handleButtonClick}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default CheckableContent;
