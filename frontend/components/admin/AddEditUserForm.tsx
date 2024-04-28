'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserById, updateUserImageById } from '@/actions/handleUpdate.action';
import { createUser } from '@/actions/handleCreate.action';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UploadDropzone } from '@/utils/upload-thing';
import Image from 'next/image';

interface AddEditFormProps {
  user?: {
    id: string;
    profile: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      birthDate: string;
      imageUrl: string;
      role: string;
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

  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(user?.profile.imageUrl || '');

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
    <div className="container ml-0 flex items-center">
      <div className="space-y-8 max-w-md flex-1">
        <div className="space-y-6 w-full">
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
                        // @ts-ignore
                        render={({ field }) => {
                          if (element.name === 'moduleIds' && type !== 'teacher') return '';

                          return (
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
                                  <div className="w-full">
                                    <input
                                      type="date"
                                      className="w-full p-2 rounded-md"
                                      id={element.name}
                                      required={element.required}
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
                          );
                        }}
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
      <div className="flex-1 w-full flex justify-center">
        {imageUrl ? (
          <div>
            <div className="max-w-[400px] w-full max-h-[400px] overflow-hidden">
              <Image
                src={imageUrl}
                alt="Profile"
                width={400}
                height={400}
                priority
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                setIsNewImage(false);
                setImageUrl('');
              }}
            >
              Change Image
            </Button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="profileImage"
            onClientUploadComplete={async (res) => {
              setIsNewImage(true);
              // @ts-ignore
              await updateUserImageById(user?.id, user?.profile?.role?.toLowerCase() + 's', {
                imageUrl: res[0].url,
              });

              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              console.error(error);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddEditUserForm;
