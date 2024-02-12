'use client';
import React, { FC } from 'react';
import Link from '@/components/shared/Link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/shared/Icon';
import { Loader2 } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const selectedStyle = {
  color: 'white',
  background: 'rgba(45, 45, 45, 0.7)',
};

interface Tab {
  name: string;
  path: string;
  icon?: typeof Icon;
}

interface SideBarProps {
  tabs: Tab[];
  query?: string;
  loading?: boolean;
}

export const Sidebar: FC<SideBarProps> = ({ tabs, query, loading }) => {
  const pathname = usePathname();
  const searchQuery = useSearchParams();

  if (loading) {
    return (
      <div className="sticky overflow-hidden max-w-xs w-full bg-[#202020] border rounded-lg">
        <Loader2 />
      </div>
    );
  }

  const isQuery = query && searchQuery.size > 0 ? '?' + query + '=' + searchQuery.get(query) : '';
  const defaultTab = tabs.find((tab: Tab) => pathname + isQuery === tab.path)?.path || tabs[0].path;

  return (
    <div className="sticky overflow-hidden max-w-xs w-full bg-[#202020] border rounded-lg">
      <Tabs defaultValue={defaultTab} orientation="vertical">
        <TabsList className="w-full h-full flex-col">
          {tabs.map((tab, index) => (
            <div key={index + tab.name} className="w-full h-full flex-col">
              <Link href={tab.path} query={isQuery}>
                <TabsTrigger value={tab.path} className="w-full h-full gap-2 text-lg">
                  <Icon name={tab.name} />
                  {tab.name}
                </TabsTrigger>
              </Link>
            </div>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
