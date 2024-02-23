import React, { FC } from 'react';

interface TeacherProps {
  attendances: any[];
}

const Teacher: FC<TeacherProps> = ({ attendances }) => {
  return (
    <div>
      <h1>Teacher</h1>
    </div>
  );
};

export default Teacher;
