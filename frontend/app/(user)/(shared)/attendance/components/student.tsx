'use client';

import React, { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createDate, createTime } from '@/lib/utils';
import { attendanceColumns } from '@/tabs';

interface StudentProps {
  data: any[];
  moduleCode: string;
}

const Student: FC<StudentProps> = ({ data: moduleAttendances, moduleCode }) => {
  const defaultModule =
    moduleAttendances.find((moduleAttendance) => moduleAttendance.module.code === moduleCode) || moduleAttendances[0];

  const [selectedModule, setSelectedModule] = useState(defaultModule);

  const modules = moduleAttendances.map((moduleAttendance: any) => {
    return moduleAttendance.module;
  });

  return (
    <div className="h-full">
      {!moduleAttendances.length ? (
        <div className="flex items-center justify-center w-full h-full">
          <p>No attendances available</p>
        </div>
      ) : (
        <>
          <div className="max-w-xs">
            <Select
              defaultValue={selectedModule?.module.id}
              onValueChange={(value) => {
                setSelectedModule(moduleAttendances.find((moduleAttendance) => moduleAttendance.module.id === value));
              }}
            >
              <SelectTrigger className="h-6 text-xs sm:h-auto sm:text-md">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id} className="h-6 text-xs sm:h-auto sm:text-md">
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!selectedModule?.attendances?.length ? (
            <div className="flex items-center justify-center w-full h-full">
              <p>No attendances available for this module</p>
            </div>
          ) : (
            <TableComponent className="mt-10">
              <TableHeader className="sticky top-0 z-10 bg-[#202020]">
                <TableRow>
                  {attendanceColumns.map((label) => (
                    <TableHead key={label} className="text-sm">
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedModule.attendances.map(
                  ({ id, class: { name }, status, createdAt, updatedAt }: any, _id: number) => {
                    return (
                      <TableRow key={id}>
                        <TableCell>{_id + 1}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{status}</TableCell>
                        <TableCell>{createDate(createdAt)}</TableCell>
                        <TableCell>{createTime(createdAt)}</TableCell>
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </TableComponent>
          )}
        </>
      )}
    </div>
  );
};

export default Student;
