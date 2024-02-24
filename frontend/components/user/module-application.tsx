'use client';

import React, { FC } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { modulesRegistrations } from '@/actions/handleCreate.action';

interface Props {
  modules: any[];
  session: Session;
}

const maxModules = 6;

const formSchema = z.object({
  profileId: z.string().min(1, 'Student must be selected'),
  modules: z
    .array(z.string())
    .min(6, `Minimum of ${maxModules} modules should be selected `)
    .max(6, `Maximum of ${maxModules} modules can be selected`),
});

const ModuleApplication: FC<Props> = ({ modules, session }) => {
  const items = modules.map((module) => ({
    id: module.id,
    label: module.name,
  }));

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileId: session?.user?.profile?.id,
      modules: [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    const currentModules = form.getValues('modules');
    const updatedModules = checked ? [...currentModules, itemId] : currentModules.filter((id: string) => id !== itemId);
    // @ts-ignore
    form.setValue('modules', updatedModules);
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data);
      const res = await modulesRegistrations(data);
      if (res?.id) {
        toast({
          title: 'Application submitted successfully',
        });
        //
        return form.reset();
      }

      toast({
        title: res.message,
        variant: 'destructive',
      });
    } catch (e) {
      toast({
        title: "Couldn't submit application",
        variant: 'destructive',
      });

      console.log(e);
    }
  };

  return (
    <div className="space-y-5 mt-10">
      <div className="flex space-x-2">
        <h2>
          Available Modules: <span>{modules.length}</span>
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="modules"
            render={() => (
              <FormItem>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="modules"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              // @ts-ignore
                              checked={field.value?.includes(item.id)}
                              // @ts-ignore
                              onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                              disabled={
                                form.getValues('modules').length === maxModules &&
                                // @ts-ignore
                                !form.getValues('modules').includes(item.id)
                              }
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-white text-md">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-6">
            <Button disabled={isLoading} variant="secondary">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ModuleApplication;
