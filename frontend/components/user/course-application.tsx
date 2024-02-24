'use client';

import React, { FC } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Session } from 'next-auth';
import { applyForCourse } from '@/actions/handleCreate.action';
import { toast } from '@/components/ui/use-toast';

interface Props {
  courses: any[];
  session: Session;
}

const formSchema = z.object({
  studentId: z.string().min(1, 'Student must be selected'),
  courseId: z.string().min(1, 'Course must be selected'),
});

const formElements = [
  {
    label: 'Course',
    name: 'courseId',
    type: 'radio',
    required: true,
  },
];

const CourseApplication: FC<Props> = ({ courses, session }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: session?.user?.id,
      courseId: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await applyForCourse(data);

      if (res?.id) {
        toast({
          title: 'Application submitted successfully',
        });

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
          Available Courses: <span>{courses.length}</span>
        </h2>
      </div>
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
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {courses.map((course) => (
                          <FormItem key={course.id} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={course.id} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer text-lg">{course.name}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
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

export default CourseApplication;
