'use client';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserById } from '@/actions/handleUpdate.action';
import { createUser } from '@/actions/handleCreate.action';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface AddEditFormProps {
  user?: {
    id: string;
    profile: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      birthDate: string;
    };
    modules: any[];
  };
  modules: any[];
  type: string;
}

const formSchema = z.object({
  firstName: z.string().min(3, 'Name must be at least 3 characters'),
  lastName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  birthDate: z.string(),
  moduleIds: z.array(z.string()).optional(),
});

const formElements = [
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    required: true,
  },
  {
    label: 'Last Name',
    name: 'lastName',
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
    label: 'Birth Date',
    name: 'birthDate',
    type: 'date',
    required: true,
  },
  {
    label: 'Modules',
    name: 'moduleIds',
    type: 'checkbox',
    required: false,
  },
];

const AddEditUserForm: FC<AddEditFormProps> = ({ user, modules, type }) => {
  const isEdit = !!user;
  const router = useRouter();

  const moduleIds = user?.modules?.map((module) => module.id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.profile?.firstName || '',
      lastName: user?.profile?.lastName || '',
      email: user?.profile?.email || '',
      birthDate: user?.profile?.birthDate || '',
      moduleIds: moduleIds || [],
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
                    {formElements.map((element, index) => {
                      if (element.name === 'moduleIds' && !modules) return null;

                      return (
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
                                {element.type === 'checkbox' ? (
                                  <>
                                    {modules?.map((module) => (
                                      <FormItem
                                        key={module.id}
                                        className="flex flex-row items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(module.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? // @ts-ignore
                                                  field.onChange([...field.value, module.id])
                                                : // @ts-ignore
                                                  field.onChange(field.value?.filter((value) => value !== module.id));
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal text-white text-md">{module.name}</FormLabel>
                                      </FormItem>
                                    ))}
                                  </>
                                ) : element.type === 'date' ? (
                                  <input type="date" id={element.name} required={element.required} {...field} />
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
                      );
                    })}
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
