import React from 'react';
import { getStudentModules } from '@/utils/backend-route';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>No Modules Found</div>;
  }

  const studentCourseModules = await getStudentModules(session?.user.id);

  return (
    <div>
      <h1>Student Modules</h1>
      <ul>{studentCourseModules.modules?.map((module) => <li key={module.id}>{module.name}</li>)}</ul>
    </div>
  );
};

export default Profile;
