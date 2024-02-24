import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getModules, getStudentCourse } from '@/actions/handleGet.action';
import ModuleApplication from '@/components/user/module-application';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
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

  const [course, modules] = await Promise.all([getStudentCourse(session?.user?.id), getModules()]);

  return (
    <PageContainer title="Module Registration:">
      <div>
        <p>
          Student Name: {session.user.profile.firstName} {session.user.profile.lastName}
        </p>
        <p>Student ID: {session.user.id}</p>
      </div>

      {!course ? (
        <>
          <CenteredText>
            You have not enrolled in any course yet. Please
            <Link href="/enrollments/course/new">
              <Button className="p-1 text-md underline underline-offset-2" variant="link">
                enroll
              </Button>
            </Link>{' '}
            in a course first.
          </CenteredText>
        </>
      ) : (
        <ModuleApplication modules={modules} session={session} />
      )}
    </PageContainer>
  );
};

export default Page;
