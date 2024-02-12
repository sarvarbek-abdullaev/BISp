'use client';
import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@/components/shared/Popover';
import { handleDelete } from '@/actions/handleDelete.action';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';

import {
  Table as TableComponent,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface UserGroup {
  id: string;
  group: {
    id: string;
    name: string;
  };
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  year?: number;
  birthYear: number;
  createdAt: string;
  userGroup?: UserGroup[];
  course?: Course;
}

interface Group {
  id: number;
  name: string;
  year: number;
  birthYear?: number;
  email?: string;
  course: Course;
  createdAt: string;
  updatedAt: string;
  userGroups?: User[];
}

interface UsersTableProps {
  columns: string[];
  rows: User[] | Group[];
  type?: string;
}

interface Status {
  status: 'error' | 'success';
  message: string;
}

export const Table: FC<UsersTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

  let globalType = 'users';
  let revalidatePage = 'users';

  if (type === 'groups') {
    globalType = 'groups';
    revalidatePage = 'groups';
  } else if (type === 'modules') {
    globalType = 'modules';
    revalidatePage = 'programs/modules';
  } else if (type === 'courses') {
    globalType = 'courses';
    revalidatePage = 'programs/courses';
  } else {
    revalidatePage = `users/${type}`;
  }

  return (
    <TableComponent>
      <TableHeader className="sticky top-0 z-10 bg-[#202020]">
        <TableRow>
          {columns.map((label) => (
            <TableHead key={label} className="text-sm">
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(
          // @ts-ignore
          ({ id, name, email, year, birthYear, createdAt, userGroups, course, code, modules }, _id: number) => {
            return (
              <TableRow key={id + name}>
                <TableCell>{_id + 1}</TableCell>
                {(globalType === 'courses' || globalType === 'modules') && <TableCell>{code}</TableCell>}
                {name && <TableCell>{name}</TableCell>}
                {(globalType === 'groups' || globalType === 'modules') && (
                  <TableCell>{course && course.name}</TableCell>
                )}
                {globalType === 'groups' && <TableCell>{year}</TableCell>}
                {globalType === 'users' && <TableCell>{email}</TableCell>}
                {globalType === 'users' && <TableCell>{birthYear}</TableCell>}
                {globalType === 'courses' && <TableCell>{modules?.length}</TableCell>}
                <TableCell>
                  {new Date(createdAt).toLocaleDateString(navigator.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>

                {type === 'students' && (
                  // @ts-ignore
                  <TableCell>{userGroups.length > 0 ? userGroups[0]?.group.name : ''}</TableCell>
                )}
                {globalType === 'groups' && <TableCell>{userGroups ? userGroups.length : ''}</TableCell>}
                <TableCell>
                  <div className="text-white">
                    <Popover
                      element={<BsThreeDotsVertical />}
                      body={
                        <>
                          <Link href={`${type}/${id}`}>
                            <Button className="text-white w-full" variant="ghost">
                              <p className="text-left w-full">View</p>
                            </Button>
                          </Link>
                          <Link href={`${type}/${id}/edit`}>
                            <Button className="w-full text-green-700 hover:text-green-700" variant="ghost">
                              <p className="text-left w-full">Edit</p>
                            </Button>
                          </Link>
                          {type === 'student' && userGroups && userGroups?.length > 0 ? (
                            ''
                          ) : (
                            <Button
                              className="w-full text-red-700 hover:text-red-700"
                              color="red"
                              variant="ghost"
                              {...(type &&
                                id && {
                                  onClick: () => handleDelete(type, revalidatePage, id),
                                })}
                            >
                              <p className="text-left w-full">Delete</p>
                            </Button>
                          )}
                        </>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          },
        )}
      </TableBody>
    </TableComponent>
  );
};
