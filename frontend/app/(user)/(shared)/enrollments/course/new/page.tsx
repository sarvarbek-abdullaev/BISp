import React from 'react';
import CourseApplication from '@/components/user/course-application';
import { getCourses } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const courses = await getCourses();

  return (
    <div className="px-10">
      <h1 className="text-4xl font-bold font-mono text-center py-5 mb-5">Course Enrollment Page</h1>
      <div className="flex space-x-4">
        <div>
          <p>
            Student Name: {session.user.profile.firstName} {session.user.profile.lastName}
          </p>
          <p>Student ID: {session.user.id}</p>
        </div>
      </div>

      <CourseApplication courses={courses} session={session} />
    </div>
  );
};

export default Page;
