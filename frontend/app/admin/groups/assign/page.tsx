import { Sidebar } from '@/components/Sidebar';
import { Flex } from '@chakra-ui/react';
import CheckableContent from '@/components/CheckableContent';
import { getGroups, getUsers } from '@/utils/backend-route';

const AssignStudents = async ({ searchParams }: any) => {
  const { groupName } = searchParams;
  const [students, groups] = await Promise.all([getUsers('students'), getGroups()]);

  const groupTabs = groups.map((group: { name: string }) => {
    return {
      name: group.name,
      path: `/admin/groups/assign?groupName=${group.name}`,
    };
  });

  const group = groups.find((group: { name: string }) => group.name === groupName);

  return (
    <>
      <Sidebar tabs={groupTabs} query="groupName" />
      <Flex
        direction="column"
        p="5"
        w="90%"
        marginX="10"
        bg="#202020"
        borderRadius="8px"
        overflow="hidden"
        h="100%"
        justifyContent="space-between"
      >
        {groupName && (
          <CheckableContent
            title="Available Students"
            data={{
              students,
              group,
              groupName,
            }}
            buttonTitle="Save"
          />
        )}
      </Flex>
    </>
  );
};

export default AssignStudents;
