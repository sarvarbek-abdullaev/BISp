'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateExamById } from '@/actions/handleUpdate.action';
import { createExam } from '@/actions/handleCreate.action';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Module } from '@/utils/interfaces';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Exam {
  id: string;
  name: string;
  moduleId: string;
  module?: Module[];
}

interface AddEditFormProps {
  exam?: Exam;
  modules: Module[];
  type: string;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  moduleId: z.string().optional(),
});

const formElements = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Module',
    name: 'moduleId',
    type: 'dropdown',
  },
];

const AddEditExamForm: FC<AddEditFormProps> = ({ exam, modules, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: exam?.name || '',
      moduleId: exam?.moduleId || '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const isEdit = !!exam;

  const router = useRouter();

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await updateExamById(exam?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createExam(type, data);
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
                                <Select
                                  onValueChange={field.onChange}
                                  {...(field.value && { defaultValue: field.value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {modules?.map(
                                      (module) =>
                                        module.id && (
                                          <SelectItem key={module.id} value={module.id}>
                                            {module.name}
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

export default AddEditExamForm;
