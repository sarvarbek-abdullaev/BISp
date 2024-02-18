'use client';

import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@/components/shared/Popover';
import { handleDelete } from '@/actions/handleDelete.action';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { createDate, createDateTime } from '@/lib/utils';

import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DateTime } from 'next-auth/providers/kakao';

export interface Course {
  id: string;
  code: string;
  name: string;
  modules?: any[];
  enrollments?: any[];
  description: string;
  createdAt: string;
}

interface Module {
  id: string;
  code: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  course: Course;
}

interface Event {
  id: string;
  name: string;
  startDate: DateTime;
  endDate: DateTime;
  module: Module;
  createdAt: DateTime;
}

interface EventTableProps {
  columns: string[];
  rows: Event[];
  type?: string;
}

export const EventTable: FC<EventTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

  let revalidatePage = `programs/${type}`;

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
        {rows.map(({ id, name, module, startDate, endDate, createdAt }, _id: number) => {
          return (
            <TableRow key={id + name}>
              <TableCell>{_id + 1}</TableCell>
              {name && <TableCell>{name}</TableCell>}
              {<TableCell>{module?.name}</TableCell>}
              <TableCell>{createDateTime(startDate)}</TableCell>
              <TableCell>{createDateTime(endDate)}</TableCell>
              <TableCell>{createDate(createdAt)}</TableCell>
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
                      </>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableComponent>
  );
};
