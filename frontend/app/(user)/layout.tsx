import React, { FC } from 'react';
import { userTabs } from '@/tabs';
import { Container } from '@/components/shared/Container';
import { Wrapper } from '@/components/shared/Wrapper';
import { GlobalSidebar } from '@/components/shared/global-sidebar';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout: FC<LayoutProps> = async ({ children }) => {
  // @ts-ignore
  const session: Session = await getServerSession(authOptions);

  if (!session) {
    return <div>No Modules Found</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Container>
        <div className="flex h-full">
          <GlobalSidebar tabs={userTabs} session={session} />
          <Wrapper>{children}</Wrapper>
        </div>
      </Container>
    </div>
  );
};

export default UserLayout;
