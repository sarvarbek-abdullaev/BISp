'use client';
import { Flex } from '@chakra-ui/react';
import { Logo } from '@/components/shared/Logo';
import { MdNotifications } from 'react-icons/md';
import Link from '@/components/shared/Link';
import { usePathname } from 'next/navigation';
import { AccountModal } from '../shared/AccountModal';
import React, { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Session } from 'next-auth';

interface Tab {
  name: string;
  path: string;
}

interface NavbarProps {
  tabs: Tab[];
  styles?: any;
  session: Session;
}

export const Navbar: FC<NavbarProps> = ({ tabs, session, styles }) => {
  const pathname = usePathname();

  if (pathname === '/auth/login') return null;

  const defaultTab =
    tabs.find((tab) => {
      const regex = new RegExp(`^${pathname}(?:\|$)`);
      return regex.test(tab.path);
    })?.path || tabs[0].path;

  return (
    <div className="flex sticky top-0 bg-[#202020] items-center justify-between px-8 z-1" {...styles}>
      <Logo height={75} width={150} />
      <Tabs defaultValue={defaultTab} className="w-[400px]">
        <TabsList className="p-0 h-full">
          {tabs.map((tab, index) => (
            <div key={index + tab.name}>
              <Link href={tab.path}>
                <TabsTrigger value={tab.path}>{tab.name}</TabsTrigger>
              </Link>
            </div>
          ))}
        </TabsList>
      </Tabs>
      <Flex paddingY="4">
        <MdNotifications size="40px" color="#B0B0B0" />
        <AccountModal session={session} />
      </Flex>
    </div>
  );
};
