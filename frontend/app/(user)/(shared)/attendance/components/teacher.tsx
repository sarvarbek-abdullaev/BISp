import React, { FC } from 'react';

interface TeacherProps {
  attendances: any[];
  moduleCode: string;
}

const Teacher: FC<TeacherProps> = ({ attendances, moduleCode }) => {
  return (
    <div>
      <h1>Teacher</h1>
    </div>
  );
};

export default Teacher;
