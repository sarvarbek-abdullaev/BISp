import { Sidebar } from '@/components/shared/Sidebar';
import { getGroups, getModules, getStudentsForGroup } from '@/actions/handleGet.action';
import AssignStudentGroup from '@/components/admin/assign-student-group';

const AssignStudents = async ({ searchParams }: any) => {
  const { groupId } = searchParams;
  const [groups, modules] = await Promise.all([getGroups(), getModules()]);
  const group = groups.find((group: { id: string }) => group.id === groupId);
  const groupName = group?.name;

  const students = group && (await getStudentsForGroup(group?.id));

  const groupTabs = groups.map((group: { name: string; id: string }) => {
    return {
      name: group.name,
      path: `/admin/groups/assign?groupId=${group.id}`,
    };
  });

  groupTabs.unshift({ name: 'Dashboard', path: '/admin/groups/assign' });

  group && (group.modules = modules.filter((module: any) => module.level === group.level));

  return (
    <>
      <Sidebar tabs={groupTabs} query="groupName" />
      <div className="flex flex-col p-5 w-[90%] mx-10 rounded-lg bg-[#202020] rounded-8 overflow-hidden h-full justify-between">
        {groupId && (
          <AssignStudentGroup
            currentTitle="Current Students"
            availableTitle="Available Students"
            data={{
              students,
              group,
              groupName,
            }}
            buttonTitle="Save"
          />
        )}
      </div>
    </>
  );
};

export default AssignStudents;
