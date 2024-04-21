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

interface Exam {
  id: string;
  name: string;
  module: Module;
}

interface TimeTableProps {
  columns: string[];
  rows: Exam[];
  type?: string;
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TimeTable: FC<TimeTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

  let revalidatePage = 'timetable';

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
            { id, module, endTime, startTime, day, group, createdAt },
            _id: number,
          ) => {
            return (
              <TableRow key={id}>
                <TableCell>{_id + 1}</TableCell>
                {group && <TableCell>{group.name}</TableCell>}
                {<TableCell>{module?.name}</TableCell>}
                {
                  <TableCell>
                    {weekDays[day]} : {startTime} - {endTime}
                  </TableCell>
                }

                <TableCell>{createDate(createdAt)}</TableCell>
                <TableCell>
                  <div className="text-white">
                    <Popover
                      element={<BsThreeDotsVertical />}
                      body={
                        <>
                          <Link href={`?groupName=${group.name}`}>
                            <Button className="text-white w-full" variant="ghost">
                              <p className="text-left w-full">View Group</p>
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
          },
        )}
      </TableBody>
    </TableComponent>
  );
};
