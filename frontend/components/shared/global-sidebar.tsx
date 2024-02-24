'use client';

import React, { FC } from 'react';
import Link from '@/components/shared/Link';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/shared/Icon';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { AccountModal } from '@/components/shared/AccountModal';
import { Session } from 'next-auth';
import { cn } from '@/lib/utils';

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
    <div className="fixed bottom-0 left-0 z-20 right-0 md:sticky overflow-hidden md:max-w-[300px] w-full bg-gray-950 md:bg-[#202020] rounded-lg md:rounded-r-lg md:py-5 flex-col md:flex">
      <div className="hidden md:flex items-center justify-center w-full">
        <Logo width={200} height={100} />
      </div>
      <div className="flex-1 md:mt-20">
        <div className="p-4 md:w-full h-full flex md:flex-col md:p-0 bg-transparent justify-start">
          {tabs.map((tab, index) => (
            <Link
              key={index + tab.name}
              href={tab.path}
              query={isQuery}
              indicator={true}
              className={cn('relative w-full md:px-10 md:flex', (index === 1 || index == 2) && 'hidden')}
            >
              <div className="w-auto text-center md:text-start md:w-full text-xs h-full md:gap-2 md:text-lg justify-start md:px-5 font-semibold py-1.5 text-inherit">
                {tab.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex w-full mx-5">
        <AccountModal session={session} type="sidebar" />
        {/*<ModeToggle />*/}
      </div>
    </div>
  );
};
