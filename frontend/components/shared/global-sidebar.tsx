'use client';

import React, { FC } from 'react';
import Link from '@/components/shared/Link';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/shared/Icon';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { AccountModal } from '@/components/shared/AccountModal';
import { Session } from 'next-auth';

interface Tab {
  name: string;
  path: string;
  icon?: typeof Icon;
}

interface SideBarProps {
  tabs: Tab[];
  query?: string;
  loading?: boolean;
  session: Session;
}

export const GlobalSidebar: FC<SideBarProps> = ({ tabs, session, query, loading }) => {
  const searchQuery = useSearchParams();

  if (loading) {
    return (
      <div className="sticky overflow-hidden max-w-xs w-full bg-[#202020] border rounded-lg">
        <Loader2 />
      </div>
    );
  }

  const isQuery = query && searchQuery.size > 0 ? '?' + query + '=' + searchQuery.get(query) : '';

  return (
    <div className="sticky overflow-hidden max-w-[300px] w-full bg-[#202020] rounded-r-lg py-5 flex-col hidden md:flex">
      <div className="flex items-center justify-center w-full">
        <Logo width={200} height={100} />
      </div>
      <div className="flex-1 mt-20">
        <div className="w-full h-full flex flex-col p-0 bg-transparent justify-start">
          {tabs.map((tab, index) => (
            <Link
              key={index + tab.name}
              href={tab.path}
              query={isQuery}
              indicator={true}
              className="relative w-full px-10"
            >
              <div className="w-full h-full gap-2 text-lg justify-start px-5 font-semibold py-1.5 text-inherit">
                {tab.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex w-full mx-5">
        <AccountModal session={session} type="sidebar" />
        {/*<ModeToggle />*/}
      </div>
    </div>
  );
};
