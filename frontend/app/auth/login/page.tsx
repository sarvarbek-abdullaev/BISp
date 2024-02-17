'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Logo } from '@/components/shared/Logo';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Page() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
      const data = JSON.stringify(values);
      await signIn('credentials', {
        data,
        redirect: false,
      }).then(({ ok, error }: any) => {
        if (ok) {
          router.push('/');
        } else {
          setMessage('Invalid email or password');
          console.log(error);
        }
      });
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
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white/70">
                          Email:
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-white dark:bg-[#313338]"
                            required={true}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white/70">
                          Password:
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-white dark:bg-[#313338]"
                            required={true}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {message && (
                    <Alert variant="destructive" className="mt-5 text-red-700 p-1 px-3">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                  <div className="text-end">
                    <Button variant="link">Forgot password?</Button>
                  </div>
                  <Button variant="secondary">Sign in</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
