import { getStudentAttendances, getTeacherModules } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Student from '@/app/(user)/(shared)/attendance/components/student';
import Teacher from '@/app/(user)/(shared)/attendance/components/teacher';
import PageContainer from '@/components/user/page-container';

const Page = async ({ searchParams }: any) => {
  const { moduleCode } = searchParams;

  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const { id, profile } = session.user;
  const role = profile.role.toLowerCase();
  let data: null;

  if (role === 'student') {
    data = await getStudentAttendances(id);
  } else {
    data = await getTeacherModules(id);
  }

  return (
    <PageContainer title="Attendance:">
      {role === 'student' ? (
        <Student data={data} moduleCode={moduleCode} />
      ) : (
        <Teacher data={data} moduleCode={moduleCode} />
      )}
    </PageContainer>
  );
};

export default Page;
