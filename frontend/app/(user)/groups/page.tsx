'use client';

import { useSession } from 'next-auth/react';
import Groups from '@/app/(user)/groups/groups';

export default function GroupsPage() {
  const { data: session } = useSession();

  if (session?.user) return;

  console.log(session);

  return <Groups studentId={session?.user.id} />;
}
