'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { updateProductById } from '@/actions/handleUpdate.action';
import { createProduct } from '@/actions/handleCreate.action';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Product } from '@/components/admin/product-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddEditFormProps {
  product?: Product;
  type: string;
}

enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  price: z.string().min(1, 'Price must be at least 1').transform(Number),
  status: z.string().min(1, 'Status must be at least 1'),
  image: z.string().optional(),
});

const formElements = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Price',
    name: 'price',
    type: 'number',
    required: true,
  },
  {
    label: 'Status',
    name: 'status',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Image',
    name: 'image',
    type: 'text',
  },
];

const AddEditProductForm: FC<AddEditFormProps> = ({ product, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      status: product?.status || '',
      image: product?.image || '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const isEdit = !!product;

  const router = useRouter();

  const handleUpdate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await updateProductById(product?.id, type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createProduct(type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = isEdit ? await handleUpdate(data) : await handleCreate(data);

      router.push(`/admin/e-commerce/${type}/${res.id}`);
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
                                  onValueChange={(value) => field.onChange(value.toString())}
                                  defaultValue={field.value ? field.value.toString() : undefined}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={Status.Active}>{Status.Active}</SelectItem>
                                    <SelectItem value={Status.Inactive}>{Status.Inactive}</SelectItem>
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

export default AddEditProductForm;
