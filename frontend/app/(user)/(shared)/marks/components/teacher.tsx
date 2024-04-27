'use client';

import React, { FC, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateWindowUrl } from '@/utils/methods';
import { AssessTable } from '@/components/admin/assess-table';
import { moduleAssessColumns } from '@/tabs';
import { getAssessMarksByModuleId } from '@/actions/handleGet.action';

interface TeacherProps {
  data: any[];
  moduleCode: string;
}

const Teacher: FC<TeacherProps> = ({ data: modules, moduleCode }) => {
  const activeModule = modules.find((module) => module.code === moduleCode);

  const [selectedModule, setSelectedModule] = useState<typeof activeModule>(activeModule);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<any[]>([]);
  const [assessColumns, setAssessColumns] = useState<string[]>(moduleAssessColumns);

  useEffect(() => {
    if (!selectedModule) return;

    getAssessMarksByModuleId(selectedModule.id)
      .then(({ studentsData, exams }) => {
        setStudents(studentsData);
        setAssessColumns(moduleAssessColumns.concat(exams.map((exam: any) => exam.name)));
      })
      .finally(() => {
        updateWindowUrl(selectedModule.code);
        setIsLoading(false);
      });
  }, [selectedModule]);

  return (
    <div className="h-full">
      {!modules.length ? (
        <div className="flex items-center justify-center w-full h-full">
          <p>You do not have any modules</p>
        </div>
      ) : (
        <>
          <div className="max-w-xs">
            <Select
              defaultValue={selectedModule?.id}
              onValueChange={(value) => {
                setSelectedModule(modules.find((module) => module.id === value));
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
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p>Loading...</p>
            </div>
          ) : !selectedModule ? (
            <div className="flex items-center justify-center w-full h-full">
              <p>No module selected</p>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full mt-10">
              <AssessTable columns={assessColumns} rows={students} type="students" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Teacher;
