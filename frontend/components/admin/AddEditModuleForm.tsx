'use client';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateModuleById } from '@/actions/handleUpdate.action';
import { Course, Module } from '@/utils/interfaces';
import { createModule } from '@/actions/handleCreate.action';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AddEditFormProps {
  module?: Module;
  courses: Course[];
  type: string;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 3 characters'),
  courseId: z.string(),
});

const formElements = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Code',
    name: 'code',
    type: 'text',
    required: true,
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    required: true,
  },
  {
    label: 'Course',
    name: 'courseId',
    type: 'dropdown',
    required: true,
  },
];

const AddEditModuleForm: FC<AddEditFormProps> = ({ module, courses, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: module?.name || '',
      code: module?.code || '',
      description: module?.description || '',
      courseId: module?.courseId || '',
    },
  });

  const isEdit = !!module;

  const isLoading = form.formState.isSubmitting;

  const router = useRouter();

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await updateModuleById(module?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createModule(type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = isEdit ? await handleUpdate(data) : await handleCreate(data);
      router.push(`/admin/programs/${type}/${res.id}`);
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {courses.map(
                                      (course) =>
                                        course.id && (
                                          <SelectItem key={course.id} value={course.id}>
                                            {course.name}
                                          </SelectItem>
                                        ),
                                    )}
                                  </SelectContent>
                                </Select>
                              ) : (
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

export default AddEditModuleForm;
