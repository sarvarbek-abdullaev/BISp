import Calendar from '@/components/shared/time-table';
import { getGroups, getLessons, getModules } from '@/utils/backend-route';

export default async function TimeTable() {
  const [groups, modules, lessons] = await Promise.all([getGroups(), getModules(), getLessons()]);

  // console.log(groups, modules, lessons);

  return (
    <div className="container-fluid p-10">
      <h1 className="h3 mb-3">Time Table</h1>
      <Calendar groups={groups} modules={modules} lessons={lessons} />
    </div>
  );
}
