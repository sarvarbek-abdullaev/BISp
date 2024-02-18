'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/actions/handleCreate.action';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Product } from '@/components/admin/product-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AddEditFormProps {
  products: Product[];
  profiles: any[];
  type: string;
}

const formSchema = z.object({
  profileId: z.string().min(1, 'Profile must be at least 1'),
  orderedProducts: z.array(
    z.object({
      productId: z.string().min(1, 'Product must be at least 1'),
      quantity: z.string().min(1, 'Quantity must be at least 1'),
      selectedSize: z.string().min(1, 'Size must be at least 1'),
    }),
  ),
});

const formElements = [
  {
    label: 'Profile',
    name: 'profileId',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Ordered Products',
    name: 'orderedProducts',
    type: 'custom',
    required: true,
  },
];

const AddEditOrderForm: FC<AddEditFormProps> = ({ products, profiles, type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileId: '',
      orderedProducts: [
        {
          productId: '',
          quantity: '',
          selectedSize: '',
        },
      ],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: 'orderedProducts',
  });

  const isLoading = form.formState.isSubmitting;

  const router = useRouter();

  const createNewProductFieldsObjectOnForm = () => {
    form.setValue('orderedProducts', [
      ...form.getValues('orderedProducts'),
      {
        productId: '',
        quantity: '',
        selectedSize: '',
      },
    ]);
  };

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    try {
      return await createOrder(type, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await handleCreate(data);
      console.log({ res });
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
                              {element.name === 'profileId' ? (
                                <Select
                                  onValueChange={(value) => field.onChange(value.toString())}
                                  defaultValue={field.value ? field.value.toString() : undefined}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a profile" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {profiles.map(({ firstName, lastName, id }) => (
                                      <SelectItem key={id} value={id}>
                                        {firstName} {lastName}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <>
                                  {fields.map((_field, index) => (
                                    <>
                                      <Controller
                                        key={_field.id + 'productId' + index}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={(value) => field.onChange(value.toString())}
                                            defaultValue={field.value ? field.value.toString() : undefined}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {products.map(({ name, id }) => (
                                                <SelectItem key={id} value={id}>
                                                  {name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        )}
                                        name={`orderedProducts.${index}.productId`}
                                        control={form.control}
                                      />
                                      <Controller
                                        key={_field.id + 'quantity' + index}
                                        render={({ field }) => (
                                          <Input
                                            id={`orderedProducts.${index}.quantity`}
                                            type="number"
                                            required={true}
                                            {...field}
                                          />
                                        )}
                                        name={`orderedProducts.${index}.quantity`}
                                        control={form.control}
                                      />
                                      <Controller
                                        key={_field.id + 'selectedSize' + index}
                                        render={({ field }) => (
                                          <Select
                                            onValueChange={(value) => field.onChange(value.toString())}
                                            defaultValue={field.value ? field.value.toString() : undefined}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="DEFAULT">Default</SelectItem>
                                              <SelectItem value="SMALL">Small</SelectItem>
                                              <SelectItem value="MEDIUM">Medium</SelectItem>
                                              <SelectItem value="LARGE">Large</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        )}
                                        name={`orderedProducts.${index}.selectedSize`}
                                        control={form.control}
                                      />
                                    </>
                                  ))}
                                </>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button type="button" variant="secondary" onClick={createNewProductFieldsObjectOnForm}>
                      Add Product
                    </Button>
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

export default AddEditOrderForm;
