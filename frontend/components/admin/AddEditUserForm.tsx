'use client';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserById } from '@/actions/handleUpdate.action';
import { createUser } from '@/actions/handleCreate.action';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddEditFormProps {
  user?: {
    id: string;
    name: string;
    email: string;
    birthYear: string;
  };
  type: string;
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  birthYear: z.string().min(4, 'Invalid birth year'),
});

const formElements = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Birth Year',
    name: 'birthYear',
    type: 'text',
    required: true,
  },
];

const AddEditUserForm: FC<AddEditFormProps> = ({ user, type }) => {
  const isEdit = !!user;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      birthYear: user?.birthYear || '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await updateUserById(type, user?.id, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createUser(type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = isEdit ? await handleUpdate(data) : await handleCreate(data);
    router.push(`/admin/users/${type}/${res.id}`);
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
                              <Input
                                id={element.name}
                                type={element.type}
                                required={element.required}
                                disabled={isLoading}
                                {...field}
                              />
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
