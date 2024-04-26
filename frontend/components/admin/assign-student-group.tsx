'use client';

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { updateUserGroups } from '@/actions/handleUpdate.action';
import { useRouter } from 'next/navigation';

interface AssignStudentGroupProps {
  data: {
    students: any[];
    group: any;
    groupName: string;
  };
  availableTitle: string;
  currentTitle: string;
  buttonTitle: string;
}

interface IFormInput {
  id: string;
  studentId: string;
  defaultSelected: boolean;
  isSelected: boolean;
}

const renderStudents = (students: any[], isChecked: boolean, setDefaultStudents: React.Dispatch<IFormInput[]>) => {
  return students.map((student: any) => {
    if (!!student.studentGroupId === isChecked) {
      return (
        <div key={student.id} className="flex items-center space-x-4">
          <Checkbox
            defaultChecked={!!student.studentGroupId}
            onCheckedChange={(checked) => {
              // @ts-ignore
              setDefaultStudents((prevState: IFormInput[]) => {
                const prevStateArray = Object.values(prevState);
                return prevStateArray.map((prevStudent) => {
                  if (prevStudent.studentId === student.id) {
                    return {
                      ...prevStudent,
                      isSelected: checked,
                    };
                  }
                  return prevStudent;
                });
              });
            }}
          />
          <Label>
            {student.profile.firstName} {student.profile.lastName}
          </Label>
        </div>
      );
    }
    return null;
  });
};

const AssignStudentGroup: FC<AssignStudentGroupProps> = ({
  availableTitle,
  currentTitle,
  buttonTitle,
  data: dataStudentGroups,
}) => {
  const { students, group } = dataStudentGroups;

  const defaultValues = students.reduce((acc, student, currentIndex) => {
    acc[currentIndex] = {
      id: student.studentGroupId,
      studentId: student.id,
      defaultSelected: !!student.studentGroupId,
      isSelected: !!student.studentGroupId,
    };
    return acc;
  }, {});

  const [defaultStudents, setDefaultStudents] = useState<IFormInput[]>(defaultValues);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const studentGroups = Object.values(defaultStudents)
        .filter((defaultStudent) => defaultStudent.isSelected && !defaultStudent.defaultSelected && defaultStudent)
        .map((student) => ({
          studentId: student.studentId,
          groupId: group.id,
        }));

      const deletedIds = Object.values(defaultStudents)
        .filter((defaultStudent) => defaultStudent.isSelected !== defaultStudent.defaultSelected && defaultStudent)
        .map((defaultStudent: any) => defaultStudent.id);

      const res = await updateUserGroups('groups', 'student-groups/manage', {
        studentGroups,
        deletedIds,
      });
      console.log({ res });
      router.push(`/admin/groups/${group.id}`);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <Label>{currentTitle}</Label>
          <div className="space-y-5 mt-2">{renderStudents(students, true, setDefaultStudents)}</div>
        </div>
        <div>
          <Label>{availableTitle}</Label>
          <div className="space-y-5 mt-2">{renderStudents(students, false, setDefaultStudents)}</div>
        </div>
        <Button type="submit" className="max-w-[200px]">
          {buttonTitle}
        </Button>
      </div>
    </form>
  );
};

export default AssignStudentGroup;
