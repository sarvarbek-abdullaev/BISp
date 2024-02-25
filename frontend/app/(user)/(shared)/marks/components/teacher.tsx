import React, { FC } from 'react';

interface TeacherProps {
  marks: any[];
  moduleCode: string;
}

const Teacher: FC<TeacherProps> = ({ marks, moduleCode }) => {
  return (
    <div>
      <h1>Teacher</h1>
    </div>
  );
};

export default Teacher;
