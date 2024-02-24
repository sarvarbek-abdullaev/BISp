import { getStudentModules } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { StudentModulesByYear } from '../../../../../backend/src/common/students/student.service';
import Link from '@/components/shared/Link';
import { ClipboardCheckIcon, UsersIcon, FileTextIcon } from 'lucide-react';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const studentCourseModules: StudentModulesByYear[] = await getStudentModules(session?.user.id);

  const currentYear = studentCourseModules[0]?.modules;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-mono mb-10">My Modules:</h1>
      {!currentYear?.length ? (
        <div>No Modules Found</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {currentYear?.map((module) => {
            const moduleLinks = [
              {
                href: `/module/${module.id}/marks`,
                icon: ClipboardCheckIcon,
                text: 'Marks',
              },
              {
                href: `/module/${module.id}/attendance`,
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
                      <Link key={index} href={link.href} className="flex flex-col gap-2 items-center text-gray-400">
                        <link.icon className="mr-1 h-5 w-5" />
                        <span>{link.text}</span>
                      </Link>
                    ))}
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

export default Dashboard;
