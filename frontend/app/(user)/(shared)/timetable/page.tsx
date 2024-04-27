import Calendar from '@/components/shared/time-table';
import PageContainer from '@/components/user/page-container';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserLessons } from '@/actions/handleGet.action';

export default async function TimeTable() {
  const session = await getServerSession(authOptions);
  const role = session?.user.profile?.role?.toLowerCase();

  if (!session || !role) return <div>Not logged in</div>;

  let lessons = await getUserLessons(role + 's', session?.user.id);

  return (
    <PageContainer title="Time Table:">
      <Calendar lessons={lessons} />
    </PageContainer>
  );
}
