'use client';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateGroupById } from '@/actions/handleUpdate.action';
import { createGroup } from '@/actions/handleCreate.action';
import { Course } from '@/components/admin/Table';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const semesters = ['SEMESTER_1', 'SEMESTER_2'];
const levels = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4'];

interface AddEditFormProps {
  data: {
    group?: {
      id: string;
      name: string;
      course: Course;
      academicYearId: number;
      level: (typeof levels)[number];
      semester: (typeof semesters)[number];
    };
    academicYears: any[];
    courses: {
      id: string;
      name: string;
      code: string;
    }[];
  };
  type: string;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  courseId: z.string().min(1, 'Course must be chosen'),
  academicYearId: z.string().min(1, 'Academic year must be chosen'),
  semester: z.string().min(1, 'Semester must be chosen'),
  level: z.string().min(1, 'Level must be chosen'),
});

const formElements = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Course',
    name: 'courseId',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Level',
    name: 'level',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Academic Year',
    name: 'academicYearId',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Semester',
    name: 'semester',
    type: 'dropdown',
    required: true,
  },
];

const AddEditUserForm: FC<AddEditFormProps> = ({ data: defaultData, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultData.group?.name || '',
      courseId: defaultData.group?.course?.id || '',
      level: defaultData.group?.level || '',
      academicYearId: defaultData.group?.academicYearId?.toString() || '',
      semester: defaultData.group?.semester || '',
    },
  });

  const isEdit = !!defaultData?.group;
  const isLoading = form.formState.isSubmitting;

  const router = useRouter();

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await updateGroupById(type, defaultData?.group?.id, data);
      if (res?.id) {
        console.log(`${type} updated`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await createGroup(type, data);
      if (res?.id) {
        console.log(`${type} created`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // @ts-ignore
      data.courseId === '' && delete data.courseId;
      isEdit ? await handleUpdate(data) : await handleCreate(data);
      const courseCode = defaultData?.courses?.find((course) => course.id === data.courseId.toString())?.code || 'all';
      router.push(`/admin/${type}?courseCode=${courseCode}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container max-w-md ml-0">
      <div className="space-y-8">
        <div>
          <div className="space-y-6">
            <div className="space-y-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                  <div className="space-y-5">
                    {formElements.map((element, index) => (
                      <FormField
                        key={element.type + index}
                        // @ts-ignore
                        name={element.name}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white/70">
                              {element.label}:
                            </FormLabel>
                            <FormControl>
                              {element.type === 'dropdown' ? (
                                // @ts-ignore
                                <Select
                                  onValueChange={field.onChange}
                                  {...(field.value && { defaultValue: field.value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Select a ${element.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {element.name === 'courseId'
                                      ? defaultData.courses.map((course) => (
                                          <SelectItem key={course.id} value={course.id}>
                                            {course.name}
                                          </SelectItem>
                                        ))
                                      : element.name === 'academicYearId'
                                        ? defaultData.academicYears?.map((academicYear) => (
                                            <SelectItem key={academicYear.id} value={academicYear.id}>
                                              {academicYear.year}
                                            </SelectItem>
                                          ))
                                        : element.name === 'semester'
                                          ? semesters.map((semester) => (
                                              <SelectItem key={semester} value={semester}>
                                                {semester}
                                              </SelectItem>
                                            ))
                                          : levels.map((level) => (
                                              <SelectItem key={level} value={level}>
                                                {level}
                                              </SelectItem>
                                            ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                // @ts-ignore
                                <Input
                                  id={element.name}
                                  type={element.type}
                                  required={element.required}
                                  disabled={isLoading}
                                  {...field}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <div className="space-y-6">
                    <Button variant="secondary">{isEdit ? 'Update' : 'Create'}</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditUserForm;
