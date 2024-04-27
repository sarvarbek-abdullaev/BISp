'use client';

import React, { FC, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateWindowUrl } from '@/utils/methods';
import { AssessTable } from '@/components/admin/assess-table';
import { moduleAssessColumns } from '@/tabs';
import { getAssessMarksByModuleId } from '@/actions/handleGet.action';
import { Popover } from '@/components/shared/Popover';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createExam } from '@/actions/handleCreate.action';

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
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [newCourseWorkTitle, setNewCourseWorkTitle] = useState<string>('');
  const [newExamCreated, setNewExamCreated] = useState<boolean>(false);

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
  }, [selectedModule, newExamCreated]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createExam('exams', {
      name: newCourseWorkTitle,
      moduleId: selectedModule.id,
    });

    setNewExamCreated((prevState) => !prevState);
  };

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
                    New Exam
                  </Button>
                }
                body={
                  <>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">New Exam</h4>
                        <p className="text-sm text-muted-foreground">Create exam with title</p>
                      </div>
                      <form onSubmit={onSubmit}>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              className="col-span-2 h-8"
                              placeholder="CW"
                              defaultValue={newCourseWorkTitle}
                              onChange={(e) => setNewCourseWorkTitle(e.target.value)}
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
