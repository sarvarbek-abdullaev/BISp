import React, { FC } from 'react';
import { Navbar } from '@/components/admin/Navbar';
import { adminTabs } from '@/tabs';
import { Container } from '@/components/shared/Container';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<LayoutProps> = async ({ children }) => {
  // @ts-ignore
  const session: Session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar tabs={adminTabs} session={session} />
      <Container className="m-2">
        <div className="flex h-full px-2">{children}</div>
      </Container>
    </div>
  );
};

export default AdminLayout;
