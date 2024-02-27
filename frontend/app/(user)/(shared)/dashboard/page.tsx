import { getStudentModules, getTeacherModules } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageContainer from '@/components/user/page-container';
import Student from '@/app/(user)/(shared)/dashboard/components/student';
import Teacher from '@/app/(user)/(shared)/dashboard/components/teacher';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.profile?.role?.toLowerCase();

  if (!session) return <div>Not logged in</div>;

  let data = null;
  if (role === 'student') {
    data = await getStudentModules(session?.user.id);
  } else if (role === 'teacher') {
    data = await getTeacherModules(session?.user.id);
  }

  return (
    <PageContainer title="My Modules:">
      {role === 'student' ? <Student data={data} /> : <Teacher data={data} />}
    </PageContainer>
  );
};

export default Dashboard;
