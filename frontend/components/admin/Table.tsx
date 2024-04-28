'use client';
import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@/components/shared/Popover';
import { handleDelete } from '@/actions/handleDelete.action';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { createDate } from '@/lib/utils';

import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { approveEnrollmentById, rejectEnrollmentById } from '@/actions/handleUpdate.action';

interface studentGroups {
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
  modules?: any[];
  enrollments?: any[];
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  profile: Profile;
  studentGroups?: studentGroups[];
}

export interface Profile {
  id: number;
  fullName: string;
  lastName: string;
  email: string;
  year?: number;
  birthYear: number;
  createdAt: string;
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

interface Enrollment {
  id: number;
  student: User;
  group: Group;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersTableProps {
  columns: string[];
  rows: User[] | Group[] | Enrollment[];
  type?: string;
}

interface Status {
  status: 'error' | 'success';
  message: string;
}

export const Table: FC<UsersTableProps> = ({ columns, rows, type: defaultType }) => {
  const type = defaultType?.includes('/') ? defaultType.split('/')[defaultType.split('/').length - 1] : defaultType;

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
  } else if (type === 'enrollments') {
    globalType = 'enrollments';
    revalidatePage = 'enrollments';
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
          (
            // @ts-ignore
            { id, student, group, status, name, year, createdAt, course, profile, code, modules, studentGroups },
            _id: number,
          ) => {
            return (
              <TableRow key={id + name}>
                <TableCell>{_id + 1}</TableCell>
                {(globalType === 'courses' || globalType === 'modules') && <TableCell>{code}</TableCell>}
                {name && <TableCell>{name}</TableCell>}
                {student?.profile.firstName && (
                  <TableCell>
                    {student.profile.firstName} {student.profile.lastName}
                  </TableCell>
                )}
                {globalType === 'users' && <TableCell>{profile.firstName}</TableCell>}
                {globalType === 'users' && <TableCell>{profile.lastName}</TableCell>}
                {(globalType === 'groups' || globalType === 'modules' || globalType === 'enrollments') && (
                  <TableCell>{course && course.name}</TableCell>
                )}
                {globalType === 'enrollments' && <TableCell>{status}</TableCell>}
                {globalType === 'groups' && <TableCell>{year}</TableCell>}
                {globalType === 'users' && <TableCell>{profile.email}</TableCell>}
                {globalType === 'users' && <TableCell>{createDate(profile.birthDate)}</TableCell>}
                {globalType === 'courses' && <TableCell>{modules?.length}</TableCell>}
                <TableCell>{createDate(createdAt)}</TableCell>
                {type === 'students' && (
                  <TableCell>{studentGroups.length > 0 ? studentGroups[0]?.group.name : ''}</TableCell>
                )}
                {globalType === 'groups' && <TableCell>{studentGroups ? studentGroups.length : ''}</TableCell>}
                <TableCell>
                  <div className="text-white">
                    <Popover
                      element={<BsThreeDotsVertical />}
                      body={
                        <>
                          <Link href={`${defaultType}/${id}`}>
                            <Button className="text-white w-full" variant="ghost">
                              <p className="text-left w-full">View</p>
                            </Button>
                          </Link>
                          {globalType !== 'enrollments' ? (
                            <>
                              <Link href={`${defaultType}/${id}/edit`}>
                                <Button className="w-full text-green-700 hover:text-green-700" variant="ghost">
                                  <p className="text-left w-full">Edit</p>
                                </Button>
                              </Link>
                              {type === 'student' && studentGroups && studentGroups?.length > 0 ? (
                                ''
                              ) : (
                                <Button
                                  className="w-full text-red-700 hover:text-red-700"
                                  color="red"
                                  variant="ghost"
                                  {...(type &&
                                    id && {
                                      onClick: () => handleDelete(type, revalidatePage, +id),
                                    })}
                                >
                                  <p className="text-left w-full">Delete</p>
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              {
                                // @ts-ignore
                                status === 'PENDING' && (
                                  <Button
                                    className="w-full text-green-700 hover:text-green-700"
                                    variant="ghost"
                                    onClick={() => approveEnrollmentById(id)}
                                  >
                                    <p className="text-left w-full">Approve</p>
                                  </Button>
                                )
                              }
                              {
                                // @ts-ignore
                                status === 'PENDING' && (
                                  <Button
                                    className="w-full text-red-700 hover:text-red-700"
                                    variant="ghost"
                                    onClick={() => rejectEnrollmentById(id)}
                                  >
                                    <p className="text-left w-full">Reject</p>
                                  </Button>
                                )
                              }
                            </>
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
