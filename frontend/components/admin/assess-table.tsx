'use client';

import React, { FC } from 'react';
import CenteredText from '@/components/shared/CenteredText';

import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MarkField } from '@/components/admin/mark-field';

interface AssessTableProps {
  columns: string[];
  rows: any[];
  type?: string;
}

export const AssessTable: FC<AssessTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

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
        {rows.map(({ id, profile, currentGroup, marks }, _id: number) => {
          return (
            <TableRow key={id + _id}>
              <TableCell>{_id + 1}</TableCell>
              {profile && <TableCell>{profile.firstName + ' ' + profile.lastName}</TableCell>}
              {<TableCell>{currentGroup?.group?.name}</TableCell>}
              {marks.map((mark: any, index: number) => {
                return (
                  <TableCell key={index}>
                    <MarkField mark={mark?.mark} id={mark.id} studentId={id} examId={mark.exam.id} />
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
