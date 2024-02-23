import { getStudentAttendances } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Student from '@/app/(user)/(shared)/attendance/components/student';
import Teacher from '@/app/(user)/(shared)/attendance/components/teacher';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const id = session.user.id;
  const role = session.user.profile.role.toLowerCase();

  const attendances = await getStudentAttendances(id);

  return (
    <div className="h-full">
      <h1>Attendance</h1>
      {role === 'student' ? <Student attendances={attendances} /> : <Teacher attendances={attendances} />}
    </div>
  );
};

export default Page;
