import { UserGroup } from '@prisma/client';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  birthYear?: number;
  role?: string;
}

export interface UserGroupData {
  userGroups: UserGroup[];
  deletedIds: string[];
}
