import React, { FC } from 'react';
import { ClipboardCheckIcon, FileTextIcon, UsersIcon } from 'lucide-react';
import Link from '@/components/shared/Link';

interface TeacherProps {
  data: any[];
}

const Teacher: FC<TeacherProps> = ({ data }) => {
  return (
    <>
      {!data?.length ? (
        <div>No Modules Found</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {data?.map((module: any) => {
            const moduleLinks = [
              {
                href: `/marks/?moduleCode=${module.code}`,
                icon: ClipboardCheckIcon,
                text: 'Marks',
              },
              {
                href: `/attendance?moduleCode=${module.code}`,
                icon: UsersIcon,
                text: 'Attendance',
              },
              {
                href: `/module/${module.id}/assignments`,
                icon: FileTextIcon,
                text: 'Assignments',
              },
            ];

            return (
              <div key={module.id} className="border-2 py-4 px-6 rounded-lg bg-gray-950 text-xl space-y-3">
                <div className="flex flex-col gap-2 h-full">
                  <h2>Name: {module.name}</h2>
                  <p>Code: {module.code}</p>
                  <div className="flex justify-between text-sm mt-10 min-h-16 items-end flex-1">
                    {moduleLinks?.map((link, index) => (
                      <Link key={index} href={link.href}>
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <link.icon className="mr-1 h-5 w-5" />
                          <span>{link.text}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Teacher;
