import { getStudentMarks, getTeacherModules } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PageContainer from '@/components/user/page-container';
import Student from '@/app/(user)/(shared)/marks/components/student';
import Teacher from '@/app/(user)/(shared)/marks/components/teacher';

const Profile = async ({ searchParams }: any) => {
  const { moduleCode } = searchParams;

  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const id = session.user.id;
  const role = session.user.profile.role.toLowerCase();

  let data: [];

  if (role === 'student') {
    data = await getStudentMarks(id);
  } else {
    data = await getTeacherModules(id);
  }

  if (!data?.length) {
    return <div>No Modules Found</div>;
  }

  return (
    <PageContainer title="Marks:">
      {role === 'student' ? (
        <Student data={data} moduleCode={moduleCode} />
      ) : (
        <Teacher data={data} moduleCode={moduleCode} />
      )}
    </PageContainer>
  );
};

export default Profile;
