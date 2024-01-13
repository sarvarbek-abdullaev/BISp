'use client';
import React, { FC } from 'react';
import { Tab, TabIndicator, TabList, Tabs } from '@chakra-ui/tabs';
import Link from '@/components/Link';
import { Flex } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/Icon';

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
}

export const Sidebar: FC<SideBarProps> = ({ tabs }) => {
  const pathname = usePathname();
  const defaultTabIndex = tabs.findIndex((tab: Tab) => pathname === tab.path);
  const isCurrentTab = (tab: Tab) => pathname === tab.path;

  return (
    <Flex position="sticky" bg="#202020" overflow="hidden" color="#B0B0B0" maxW="240px" w="100%" borderRadius="8px">
      <Tabs variant="unstyled" orientation="vertical" w="100%" index={defaultTabIndex}>
        <TabList w="100%">
          {tabs.map((tab, index) => (
            <Link key={index + tab.name} href={tab.path}>
              <Tab
                position="relative"
                _selected={selectedStyle}
                _hover={selectedStyle}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '16px',
                }}
                padding="4"
                fontSize="md"
              >
                <Flex gap="3" alignItems="center">
                  <Icon name={tab.name} />
                  {tab.name}
                </Flex>
                {isCurrentTab(tab) && (
                  <TabIndicator
                    right="0"
                    top="0 !important"
                    height="100% !important"
                    w="1px"
                    bg="blue.500"
                    borderRadius="1px"
                  />
                )}
              </Tab>
            </Link>
          ))}
        </TabList>
      </Tabs>
    </Flex>
  );
};
