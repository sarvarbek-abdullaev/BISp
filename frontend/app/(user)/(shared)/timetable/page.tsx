import Calendar from '@/components/shared/time-table';
import { getLessons } from '@/actions/handleGet.action';
import PageContainer from '@/components/user/page-container';

export default async function TimeTable() {
  const lessons = await getLessons();

  return (
    <PageContainer title="Time Table:">
      <Calendar lessons={lessons} />
    </PageContainer>
  );
}
