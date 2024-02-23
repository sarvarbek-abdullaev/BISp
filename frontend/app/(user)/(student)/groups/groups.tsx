import { getGroupsByUserId } from '@/actions/handleGet.action';
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
