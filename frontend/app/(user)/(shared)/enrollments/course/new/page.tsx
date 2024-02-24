import React from 'react';
import CourseApplication from '@/components/user/course-application';
import { getCourses } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageContainer from '@/components/user/page-container';

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
    <PageContainer title="Course Registration:">
      <div className="flex space-x-4">
        <div>
          <p>
            Student Name: {session.user.profile.firstName} {session.user.profile.lastName}
          </p>
          <p>Student ID: {session.user.id}</p>
        </div>
      </div>

      <CourseApplication courses={courses} session={session} />
    </PageContainer>
  );
};

export default Page;
