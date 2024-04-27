'use client';

import React, { FC, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAttendanceByModuleId } from '@/actions/handleGet.action';
import { AttendanceTable } from '@/components/admin/attendance-table';
import { Popover } from '@/components/shared/Popover';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createAttendanceClass } from '@/actions/handleCreate.action';
import { moduleAttendanceColumns } from '@/tabs';

interface TeacherProps {
  data: any[];
  moduleCode: string;
}

const Teacher: FC<TeacherProps> = ({ data, moduleCode }) => {
  const activeModule = data.find((module) => module.code === moduleCode);

  const [selectedModule, setSelectedModule] = useState<typeof activeModule>(activeModule);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [attendanceColumns, setAttendanceColumns] = useState<string[]>(moduleAttendanceColumns);
  const [newClassTitle, setNewClassTitle] = useState<string>('');
  const [newClassCreated, setNewClassCreated] = useState<boolean>(false);

  // Update window URL with module code
  const updateWindowUrl = (moduleCode: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('moduleCode', moduleCode);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
  };

  useEffect(() => {
    if (!selectedModule) return;

    setIsLoading(true);
    getAttendanceByModuleId(selectedModule.id)
      .then(({ studentsData, attendanceClasses }) => {
        setStudents(studentsData);

        const attendanceClassNames = attendanceClasses.map((attendanceClass: any) => attendanceClass.title);
        setAttendanceColumns(moduleAttendanceColumns.concat(attendanceClassNames));
      })
      .finally(() => {
        updateWindowUrl(selectedModule.code);
        setIsLoading(false);
      });
  }, [selectedModule, newClassCreated]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new attendance class
    const resp = await createAttendanceClass({
      title: newClassTitle,
      moduleId: selectedModule.id,
    });

    setNewClassCreated((prevState) => !prevState);

    if (resp) {
      setNewClassTitle('');
      setPopoverOpen(false);
    }
  };

  return (
    <div className="h-full">
      {!data.length ? (
        <div className="flex items-center justify-center w-full h-full">
          <p>You do not have any modules</p>
        </div>
      ) : (
        <>
          <div className="max-w-xs">
            <Select
              defaultValue={selectedModule?.id}
              onValueChange={(value) => {
                setSelectedModule(data.find((module) => module.id === value));
              }}
            >
              <SelectTrigger className="h-6 text-xs sm:h-auto sm:text-md">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent>
                {data.map((module) => (
                  <SelectItem key={module.id} value={module.id} className="h-6 text-xs sm:h-auto sm:text-md">
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedModule && !isLoading ? (
              <div className="text-white mt-4">
                <Popover
                  isOpen={popoverOpen}
                  element={
                    <Button
                      variant="default"
                      className="flex gap-2"
                      onClick={() => setPopoverOpen((prevState) => !prevState)}
                    >
                      <FaPlus />
                      New Attendance Class
                    </Button>
                  }
                  body={
                    <>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">New Attendance Class</h4>
                          <p className="text-sm text-muted-foreground">Create class with title</p>
                        </div>
                        <form onSubmit={onSubmit}>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                className="col-span-2 h-8"
                                placeholder="Lecture 1"
                                defaultValue={newClassTitle}
                                onChange={(e) => setNewClassTitle(e.target.value)}
                              />
                            </div>
                            <Button variant="default" className="w-full px-10 mt-4">
                              Create
                            </Button>
                          </div>
                        </form>
                      </div>
                    </>
                  }
                />
              </div>
            ) : null}
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
              <AttendanceTable columns={attendanceColumns} rows={students} type="students" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Teacher;
