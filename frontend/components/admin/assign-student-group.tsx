'use client';

import React, { FC, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { updateUserGroups } from '@/actions/handleUpdate.action';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { z } from 'zod';

const StudentSchema = z.object({
  id: z.string(),
  profile: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  isChecked: z.boolean(),
});

const GroupSchema = z.object({
  id: z.string(),
});

const AssignStudentGroupSchema = z.object({
  students: z.array(StudentSchema),
  group: GroupSchema,
  groupName: z.string(),
});

const AssignStudentGroup: FC<AssignStudentGroupProps> = ({
  availableTitle,
  currentTitle,
  buttonTitle,
  data: dataStudentGroups,
}) => {
  const { students: defaultStudents, group, groupName } = dataStudentGroups;
  const groupId = group.id;

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AssignStudentGroupSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('Form Data:', data);

    try {
      const userGroups = data.students
        .filter(
          (student: any) =>
            student.isChecked !==
            defaultStudents.find((defaultStudent: any) => defaultStudent.id === student.id)?.isChecked,
        )
        .map((student: any) => ({
          userId: student.id,
          groupId: group.id,
        }));

      const deletedIds = defaultStudents
        .filter(
          (defaultStudent: any) => !data.students.find((student: any) => student.id === defaultStudent.id)?.isChecked,
        )
        .map((defaultStudent: any) => defaultStudent.id);

      console.log('User Groups:', userGroups);
      console.log('Deleted IDs:', deletedIds);

      const res = await updateUserGroups('groups/assign', 'user-groups/manage', {
        userGroups,
        deletedIds,
      });
      //router.push(`/admin/groups/${groupId}`);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    setValue('students', defaultStudents);
  }, [defaultStudents, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <Label>{currentTitle}</Label>
          <div className="space-y-5 mt-2">
            {defaultStudents.map(
              (student: any) =>
                student.isChecked && (
                  <div key={student.id} className="flex items-center space-x-4">
                    <Checkbox {...register(`students.${student.id}.isChecked`)} defaultChecked={student.isChecked} />
                    <Label>
                      {student.profile.firstName} {student.profile.lastName}
                    </Label>
                  </div>
                ),
            )}
          </div>
        </div>
        <div>
          <Label>{availableTitle}</Label>
          <div className="space-y-5 mt-2">
            {defaultStudents.map(
              (student: any) =>
                !student.isChecked && (
                  <div key={student.id} className="flex items-center space-x-4">
                    <Checkbox {...register(`students.${student.id}.isChecked`)} defaultChecked={student.isChecked} />
                    <Label>
                      {student.profile.firstName} {student.profile.lastName}
                    </Label>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <Button type="submit" className="max-w-[200px]">
        {buttonTitle}
      </Button>
    </form>
  );
};

export default AssignStudentGroup;
