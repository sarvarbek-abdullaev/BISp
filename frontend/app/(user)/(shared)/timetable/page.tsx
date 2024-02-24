import Calendar from '@/components/shared/time-table';
import { getGroups, getLessons, getModules } from '@/actions/handleGet.action';
import PageContainer from '@/components/user/page-container';

export default async function TimeTable() {
  const [groups, modules, lessons] = await Promise.all([getGroups(), getModules(), getLessons()]);

  // console.log(groups, modules, lessons);

  return (
    <PageContainer title="Time Table:">
      <Calendar groups={groups} modules={modules} lessons={lessons} />
    </PageContainer>
  );
}
