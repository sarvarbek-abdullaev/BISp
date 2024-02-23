import React, { FC } from 'react';

interface StudentProps {
  attendances: any[];
}

const Student: FC<StudentProps> = ({ attendances }) => {
  return (
    <div className="h-full">
      {!attendances.length ? (
        <div className="flex items-center justify-center w-full h-full">
          <p>No attendances available</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance: any) => {
              return (
                <tr key={attendance.id}>
                  <td>{attendance.time}</td>
                  <td>{attendance.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Student;
