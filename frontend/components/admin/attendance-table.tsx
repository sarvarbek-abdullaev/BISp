'use client';

import React, { FC } from 'react';
import CenteredText from '@/components/shared/CenteredText';

import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AttendanceStatus } from '@/utils/interfaces';
import { createAttendance } from '@/actions/handleCreate.action';
import { updateAttendanceById } from '@/actions/handleUpdate.action';

interface AttendanceTableProps {
  columns: string[];
  rows: any[];
  type?: string;
}

export const AttendanceTable: FC<AttendanceTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

  const onValueChange = async (status: string, studentId: string, attendanceClassId: string, attendanceId?: string) => {
    const data = {
      status,
      studentId,
      attendanceClassId,
    };

    if (!attendanceId) {
      return createAttendance(data);
    }

    await updateAttendanceById(attendanceId, data);
  };

  return (
    <TableComponent>
      <TableHeader className="sticky top-0 z-10 bg-[#202020]">
        <TableRow>
          {columns.map((label, id) => {
            return (
              <TableHead key={label + id} className="text-sm">
                {label}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ id, profile, currentGroup, attendances }, _id: number) => {
          return (
            <TableRow key={id + _id}>
              <TableCell>{_id + 1}</TableCell>
              {profile && <TableCell>{profile.firstName + ' ' + profile.lastName}</TableCell>}
              {<TableCell>{currentGroup?.group?.name}</TableCell>}
              {attendances.map((attendance: any, index: number) => {
                return (
                  <TableCell key={index}>
                    <Select
                      defaultValue={attendance?.status}
                      onValueChange={async (value) => {
                        await onValueChange(value, id, attendance.attendanceClass.id, attendance?.id);
                      }}
                    >
                      <SelectTrigger className="h-6 text-xs sm:h-auto sm:text-md">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(AttendanceStatus).map((status) => (
                          <SelectItem key={status} value={status} className="h-6 text-xs sm:h-auto sm:text-md">
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableComponent>
  );
};
