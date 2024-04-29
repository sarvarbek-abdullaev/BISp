'use client';
import { MdAccountCircle } from 'react-icons/md';
import { signOut } from 'next-auth/react';
import { Popover } from '@/components/shared/Popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Session } from 'next-auth';

interface AccountModalProps {
  type?: 'navbar' | 'sidebar';
  session: Session;
}

export const AccountModal: FC<AccountModalProps> = ({ type = 'navbar', session }) => {
  const {
    user: {
      profile: { role, firstName, lastName, imageUrl },
    },
  } = session;

  const fullName = `${firstName} ${lastName}`;

  if (type === 'sidebar') {
    return (
      <div className="flex gap-3 text-left">
        <Popover
          element={
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            </Avatar>
          }
          body={
            <>
              {/*<Button className="w-full justify-start" variant="ghost">*/}
              {/*  <Link style={{ textAlign: 'left', width: '100%' }} href={'/profile'}>*/}
              {/*    My Profile*/}
              {/*  </Link>*/}
              {/*</Button>*/}
              <Button className="w-full justify-start" variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          }
        />
        <div>
          <div className="font-semibold">{fullName}</div>
          <div className="text-xs mt-[1px]">{role}</div>
        </div>
      </div>
    );
  }

  return (
    <Popover
      element={<MdAccountCircle size="40px" color="#B0B0B0" />}
      header={
        session && (
          <div className="flex gap-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">
                {session?.user?.profile?.firstName} {session?.user?.profile?.lastName}
              </div>
              <div className="font-semibold">{session?.user?.profile?.email}</div>
              <div className="text-xs">{session?.user?.profile?.role}</div>
            </div>
          </div>
        )
      }
      body={
        <>
          {/*<Button className="w-full justify-start" variant="ghost">*/}
          {/*  <Link style={{ textAlign: 'left', width: '100%' }} href={'/profile'}>*/}
          {/*    My Profile*/}
          {/*  </Link>*/}
          {/*</Button>*/}
          <Button className="w-full justify-start" variant="ghost" onClick={() => signOut()}>
            Logout
          </Button>
        </>
      }
    />
  );
};
