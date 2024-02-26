'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Logo } from '@/components/shared/Logo';
import { changePassword } from '@/actions/handleUpdate.action';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  oldPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

const formElements = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Old Password',
    name: 'oldPassword',
    type: 'password',
    required: true,
  },
  {
    label: 'New Password',
    name: 'newPassword',
    type: 'password',
    required: true,
  },
];

export default function Page() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
    },
  });

  const [message, setMessage] = useState<string | null>(null);

  message &&
    form.watch((value) => {
      setMessage(null);
    });

  const isLoading = form.formState.isSubmitting;
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await changePassword(values);
      console.log({ response });

      if (response.statusCode) {
        return toast({
          title: response.message,
          variant: 'destructive',
        });
      }

      toast({
        title: 'Password changed successfully',
        type: 'foreground',
      });

      router.push('/auth/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto max-w-lg w-full py-12 md:py-24 px-0 sm:px-8 h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full pt-10 border border-black">
          <div className="space-y-6">
            <div className="flex justify-center items-center">
              <Logo height={300} width={300} />
            </div>
            <div className="space-y-2 md:space-y-3 text-center">
              <h2 className="text-md md:text-xl">Log in to your account</h2>
            </div>
          </div>
          <div className="w-full py-0 sm:py-8 px-4 sm:px-10 bg-transparent sm:bg-surface shadow-none sm:shadow-md rounded-none sm:rounded-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="space-y-5">
                  {formElements.map((element, index) => {
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
                              <Input
                                id={element.name}
                                type={element.type}
                                className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-white dark:bg-[#313338]"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}

                  {message && (
                    <Alert variant="destructive" className="mt-5 text-red-700 p-1 px-3">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                  <Button variant="secondary">Change Password</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
