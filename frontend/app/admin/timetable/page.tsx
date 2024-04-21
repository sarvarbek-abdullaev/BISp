import { getGroups, getLessons, getModules } from '@/actions/handleGet.action';
import CalendarAdmin from '@/components/shared/time-table-admin';
import { Sidebar } from '@/components/shared/Sidebar';

const UsersPage = async ({ searchParams }: any) => {
  const { groupName } = searchParams;
  const [modules, groups, lessons] = await Promise.all([getModules(), getGroups(), getLessons()]);

  const groupTabs = groups.map((group: { name: string }) => {
    return {
      name: group.name,
      path: `/admin/timetable?groupName=${group.name}`,
    };
  });

  groupTabs.unshift({ name: 'Dashboard', path: '/admin/timetable' });

  const currentLessons = lessons.filter((lesson: any) => lesson.group.name === groupName);

  const group = groups.find((group: { name: string }) => group.name === groupName);

  group && (group.modules = modules.filter((module: any) => module.level === group.level));

  return (
    <>
      <Sidebar tabs={groupTabs} query="groupName" />
      <div className="flex flex-col p-5 w-[90%] mx-10 rounded-lg bg-[#202020] rounded-8 overflow-hidden h-full justify-between">
        {groupName && (
          <CalendarAdmin modules={modules} groups={groups} lessons={currentLessons} groupName={groupName} />
        )}
      </div>
    </>

    // <div className="flex w-full h-full flex-col gap-4">
    //   <Sidebar tabs={groupTabs} query="groupName" />
    //   <Wrapper flex="1">
    //     <CalendarAdmin modules={modules} groups={groups} lessons={lessons} />
    //   </Wrapper>
    // </div>
  );
};

export default UsersPage;
