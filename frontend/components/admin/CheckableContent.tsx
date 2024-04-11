'use client';

import React, { FC, useEffect, useState } from 'react';
import { updateUserGroups } from '@/actions/handleUpdate.action';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Student {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
  };
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

  console.log({ group });
  const groupId = group.id;
  // @ts-ignore
  const handleStudentsIds = (students, groupId) => {
    // @ts-ignore
    const userIdsSet = new Set();

    // @ts-ignore
    students.forEach((student) => {
      // @ts-ignore
      const filteredUserGroups = student.studentGroups.filter((userGroup) => userGroup?.group?.id === groupId);
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
      const filteredUserGroups = student.studentGroups.filter((userGroup) => userGroup?.group?.id === groupId);
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
      <div className="space-y-5 mt-2">
        {students?.map((student: Student) => {
          if (student.isChecked === filterSelected) return;

          return (
            <div key={student.id} className="flex items-center space-x-4">
              <Checkbox onChange={() => handleCheckboxChange(student.id)} checked={!!student?.isChecked} />
              <Label>
                {student.profile.firstName} {student.profile.lastName}
              </Label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <Label>{currentTitle}</Label>
          <CheckBoxes students={students} filterSelected={false} />
        </div>
        <div>
          <Label>{availableTitle}</Label>
          <CheckBoxes students={students} filterSelected={true} />
        </div>
      </div>
      <Button className="max-w-[200px]" onClick={handleButtonClick}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default CheckableContent;
