import { getGroupsByUserId } from '@/utils/backend-route';
import { FC } from 'react';

interface GroupProps {
  studentId?: string;
}

const Groups: FC<GroupProps> = async ({ studentId }): Promise<any> => {
  if (!studentId) return;

  const groups = await getGroupsByUserId(studentId);

  // return (
  //
  // )
};

export default Groups;
