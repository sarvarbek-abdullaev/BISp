'use client';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { createEnrollment } from '@/actions/handleCreate.action';
import { Course } from '@/components/admin/Table';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddEditFormProps {
  courses: Course[];
  students: any[];
  type: string;
}

const formSchema = z.object({
  studentId: z.string().min(1, 'Student must be selected'),
  courseId: z.string().min(1, 'Course must be selected'),
});

const formElements = [
  {
    label: 'Student',
    name: 'studentId',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Course',
    name: 'courseId',
    type: 'dropdown',
    required: true,
  },
];

const AddEditEnrollmentForm: FC<AddEditFormProps> = ({ students, courses, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      courseId: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const router = useRouter();

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await createEnrollment(type, data);

      if (res?.id) {
        console.log(`${type} created`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await handleCreate(data);

      const courseCode = courses?.find((course) => course.id === data.courseId.toString())?.code || 'all';
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
                                    <SelectValue
                                      placeholder={element.label === 'Student' ? 'Select a student' : 'Select a course'}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.name === 'studentId'
                                      ? students.map((student) => (
                                          <SelectItem key={student.id} value={student.id}>
                                            {student.profile.firstName} {student.profile.lastName}
                                          </SelectItem>
                                        ))
                                      : courses.map((course) => (
                                          <SelectItem key={course.id} value={course.id}>
                                            {course.name}
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
                    <Button variant="secondary">Create</Button>
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

export default AddEditEnrollmentForm;
