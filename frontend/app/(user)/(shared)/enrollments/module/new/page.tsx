import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getModules } from '@/actions/handleGet.action';
import ModuleApplication from '@/components/user/module-application';

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

  const modules = await getModules();

  return (
    <div className="px-10">
      <h1 className="text-4xl font-bold font-mono text-center py-5 mb-5">Module Registration Page</h1>
      <div className="flex space-x-4">
        <div>
          <p>
            Student Name: {session.user.profile.firstName} {session.user.profile.lastName}
          </p>
          <p>Student ID: {session.user.id}</p>
        </div>
      </div>

      <ModuleApplication modules={modules} session={session} />
    </div>
  );
};

export default Page;
