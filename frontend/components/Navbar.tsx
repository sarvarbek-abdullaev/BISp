'use client';
import { Tab, TabList, Tabs } from '@chakra-ui/tabs';
import { Flex } from '@chakra-ui/react';
import { Logo } from '@/components/Logo';
import { MdNotifications } from 'react-icons/md';
import Link from '@/components/Link';
import { usePathname } from 'next/navigation';
import { AccountModal } from './AccountModal';
import { FC } from 'react';

const selectedStyle = {
  color: 'white',
  bg: 'black',
  border: '1px solid #B0B0B0',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
};

const unselectedStyle = {
  border: '1px solid transparent',
};

interface Tab {
  name: string;
  path: string;
}

interface NavbarProps {
  tabs: Tab[];
  styles?: any;
}

export const Navbar: FC<NavbarProps> = ({ tabs, styles }) => {
  const pathname = usePathname();

  if (pathname === '/auth/login') return null;

  const defaultTabIndex = tabs.findIndex((tab) => pathname.includes(tab.path)) || 0;

  return (
    <Flex
      position="sticky"
      top="0"
      bg="#202020"
      color="#B0B0B0"
      alignItems="center"
      justifyContent="space-between"
      paddingX="8"
      {...styles}
    >
      <Logo size="10" />
      <Tabs alignSelf="end" variant="unstyled" defaultIndex={defaultTabIndex}>
        <TabList>
          {tabs.map((tab, index) => (
            <Link key={index + tab.name} href={tab.path}>
              <Tab _selected={selectedStyle} {...unselectedStyle} paddingBottom="3">
                {tab.name}
              </Tab>
            </Link>
          ))}
        </TabList>
      </Tabs>
      <Flex paddingY="4">
        <MdNotifications size="40px" color="#B0B0B0" />
        <AccountModal />
      </Flex>
    </Flex>
  );
};
