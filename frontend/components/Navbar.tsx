import { Tab, TabList, Tabs } from '@chakra-ui/tabs';
import { Flex } from '@chakra-ui/react';
import { Logo } from '@/components/Logo';
import { MdAccountCircle, MdNotifications } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
    {
        name: 'Dashboard',
        path: '/',
    },
    {
        name: 'Account',
        path: '/account',
    },
    {
        name: 'TimeTable',
        path: '/timetable',
    },
    {
        name: 'Events',
        path: '/events',
    },
    {
        name: 'Settings',
        path: '/settings',
    },
]

const selectedStyle = {
    color: 'white',
    bg: 'black',
    border: '1px solid #B0B0B0',
//   need to add border radius for all corners except
//   top left and top right
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
}

const unselectedStyle = {
    border: '1px solid transparent'
}


export const Navbar = () => {
    const pathname = usePathname();
    if (pathname.includes("/login")) return null;

    return (
        <Flex bg='#202020' color="#B0B0B0" alignItems="center" justifyContent="space-between" paddingX="8">
            <Logo size='10'/>
            <Tabs alignSelf="end" variant='unstyled'>
                <TabList>
                    {tabs.map((tab, index) => (
                        <Link key={index + tab.name} href={tab.path}>
                          <Tab  _selected={selectedStyle} {...unselectedStyle} paddingBottom='3'>
                              {tab.name}
                          </Tab>
                        </Link>
                    ))}
                </TabList>
            </Tabs>
            <Flex paddingY="4">
               <MdNotifications size='40px' color='#B0B0B0'/>
               <MdAccountCircle size='40px' color='#B0B0B0'/>
            </Flex>
        </Flex>
    )
}
