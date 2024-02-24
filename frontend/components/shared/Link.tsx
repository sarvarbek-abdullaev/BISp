'use client';
import NextLink from 'next/link';
import React, { FC } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  query?: string;
  indicator?: boolean;
  className?: string;
}
const Link: FC<LinkProps> = ({ href, children, className, indicator = false, query }) => {
  const pathname = usePathname();

  const isActive = href.includes(pathname + query) && pathname.includes(href);
  return (
    <NextLink href={href} className={cn(className, isActive ? 'disabled' : '')}>
      <div
        className={cn(
          'absolute top-0 right-0 w-[5px] rounded-lg h-full hidden md:block',
          isActive && indicator && 'bg-foreground',
        )}
      />
      <div className={cn(indicator && 'text-muted-foreground', isActive && indicator ? 'text-foreground' : '')}>
        {children}
      </div>
    </NextLink>
  );
};

export default Link;
