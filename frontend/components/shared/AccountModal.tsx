import { MdAccountCircle } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Popover } from '@/components/shared/Popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const AccountModal = () => {
  const { data: session } = useSession();

  return (
    <Popover
      element={<MdAccountCircle size="40px" color="#B0B0B0" />}
      header={
        <div className="flex gap-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{session?.user?.name}</div>
            <div className="font-semibold">{session?.user?.email}</div>
            <div className="text-xs">{session?.user?.role}</div>
          </div>
        </div>
      }
      body={
        <>
          <Button className="w-full justify-start" variant="ghost">
            <Link style={{ textAlign: 'left', width: '100%' }} href="/profile">
              My Profile
            </Link>
          </Button>
          <Button className="w-full justify-start" variant="ghost" onClick={() => signOut()}>
            Logout
          </Button>
        </>
      }
    />
  );
};
