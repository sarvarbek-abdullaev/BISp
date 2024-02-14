import { Profile, StudentGroup } from '@prisma/client';

export interface UserDto {
  id: string;
  profile?: Profile;
}

export interface UserGroupData {
  userGroups: StudentGroup[];
  deletedIds: string[];
}
