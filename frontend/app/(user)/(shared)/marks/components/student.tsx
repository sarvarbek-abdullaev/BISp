'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';

interface StudentProps {
  data: any[];
  moduleCode: string;
}

const Student: FC<StudentProps> = ({ data: modules, moduleCode }) => {
  const highlightedModuleId = modules.find((module) => module.code === moduleCode)?.id;

  return (
    <div className="h-full">
      {!modules.length ? (
        <div className="flex items-center justify-center w-full h-full">
          <p>No marks available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {modules?.map((module) => {
            const { id, code, name, level, exams, overall } = module;
            const isHighlighted = highlightedModuleId === id;
            return (
              <div
                key={id}
                className={cn(
                  'w-auto border-2 py-4 px-6 rounded-lg bg-gray-950 text-sm sm:text-xl space-y-3',
                  isHighlighted && 'border-gray-700',
                )}
              >
                <div className="flex flex-col gap-2">
                  <h2>Name: {name}</h2>
                  <p>Code: {code}</p>
                  <p>Level: {level}</p>
                  <p className="mt-2">Mark: {overall || 'TBA'}</p>
                  <div className="flex justify-between text-sm sm:mt-10 sm:min-h-10 items-end">
                    <div className="flex flex-col items-center gap-2">
                      {exams.map((exam: any, index: number) => {
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <span>{exam.name}:</span>
                            <span>{exam.mark}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Student;
