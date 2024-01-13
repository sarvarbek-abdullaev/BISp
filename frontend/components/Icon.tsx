import { PhoneIcon } from '@chakra-ui/icons';
import { FC } from 'react';

interface IconProps {
  name: keyof typeof ICONS | string;
}

const ICONS = {
  students: <PhoneIcon />,
  teachers: <PhoneIcon />,
  admins: <PhoneIcon />,
  dashboard: <PhoneIcon />,
  settings: <PhoneIcon />,
  logout: <PhoneIcon />,
  groups: <PhoneIcon />,
  timeTable: <PhoneIcon />,
  events: <PhoneIcon />,
};

export const Icon: FC<IconProps> = ({ name }) => {
  // @ts-ignore
  return <>{ICONS[name.toLowerCase()]}</>;
};
