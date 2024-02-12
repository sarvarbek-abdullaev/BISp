'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourseById } from '@/actions/handleUpdate.action';
import { Course } from '@/utils/interfaces';
import { createCourse } from '@/actions/handleCreate.action';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface AddEditFormProps {
  course?: Course;
  type: string;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 3 characters'),
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
];

const AddEditCourseForm: FC<AddEditFormProps> = ({ course, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: course?.name || '',
      code: course?.code || '',
      description: course?.description || '',
      modules: course?.modules || [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const isEdit = !!course;

  const router = useRouter();

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await updateCourseById(course?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createCourse(type, data);
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
                              {element.type === 'textarea' ? (
                                // @ts-ignore
                                <Textarea
                                  id={element.name}
                                  required={element.required}
                                  disabled={isLoading}
                                  {...field}
                                />
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

export default AddEditCourseForm;
