import { Sidebar } from '@/components/shared/Sidebar';
import CheckableContent from '@/components/admin/CheckableContent';
import { getGroups, getModules, getUsers } from '@/actions/handleGet.action';

const AssignStudents = async ({ searchParams }: any) => {
  const { groupName } = searchParams;
  const [students, groups, modules] = await Promise.all([getUsers('students'), getGroups(), getModules()]);

  const groupTabs = groups.map((group: { name: string }) => {
    return {
      name: group.name,
      path: `/admin/groups/assign?groupName=${group.name}`,
    };
  });

  groupTabs.unshift({ name: 'Dashboard', path: '/admin/groups/assign' });

  const group = groups.find((group: { name: string }) => group.name === groupName);

  group && (group.modules = modules.filter((module: any) => module.level === group.level));

  return (
    <>
      <Sidebar tabs={groupTabs} query="groupName" />
      <div className="flex flex-col p-5 w-[90%] mx-10 rounded-lg bg-[#202020] rounded-8 overflow-hidden h-full justify-between">
        {groupName && (
          <CheckableContent
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
