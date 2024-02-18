'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateEventById } from '@/actions/handleUpdate.action';
import { Module } from '@/utils/interfaces';
import { createEvent } from '@/actions/handleCreate.action';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddEditFormProps {
  event?: any;
  modules: Module[];
  type: string;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 3 characters'),
  startDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => new Date(date) > new Date(), 'Start date must be in the future')
    .transform((date) => new Date(date).toISOString()),
  endDate: z
    .string()
    .refine((date) => new Date(date) > new Date(), 'End date must be in the future')
    .transform((date) => new Date(date).toISOString()),
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
    label: 'Description',
    name: 'description',
    type: 'textarea',
    required: true,
  },
  {
    label: 'Start Date',
    name: 'startDate',
    type: 'date',
    required: true,
  },
  {
    label: 'End Date',
    name: 'endDate',
    type: 'date',
    required: true,
  },
  {
    label: 'Module',
    name: 'moduleId',
    type: 'dropdown',
  },
];

const AddEditEventForm: FC<AddEditFormProps> = ({ event, modules, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name || '',
      description: event?.description || '',
      startDate: event.startDate || '',
      endDate: event?.endDate || '',
      moduleId: event?.moduleId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const isEdit = !!event;

  const router = useRouter();

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await updateEventById(event?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createEvent(type, data);
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
                                    <SelectValue placeholder="Select a module" />
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
                              ) : element.type === 'date' ? (
                                <div>
                                  <input
                                    type="datetime-local"
                                    id={element.name}
                                    required={element.required}
                                    disabled={isLoading}
                                    {...field}
                                  />
                                </div>
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

export default AddEditEventForm;
