import { getStudentAttendances } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Student from '@/app/(user)/(shared)/attendance/components/student';
import Teacher from '@/app/(user)/(shared)/attendance/components/teacher';
import PageContainer from '@/components/user/page-container';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const id = session.user.id;
  const role = session.user.profile.role.toLowerCase();
  const attendances = await getStudentAttendances(id);

  return (
    <PageContainer title="Attendance:">
      {role === 'student' ? <Student attendances={attendances} /> : <Teacher attendances={attendances} />}
    </PageContainer>
  );
};

export default Page;
