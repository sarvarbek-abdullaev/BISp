import { getStudentModules } from '@/actions/handleGet.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from '@/components/shared/Link';
import { ClipboardCheckIcon, UsersIcon, FileTextIcon } from 'lucide-react';
import PageContainer from '@/components/user/page-container';

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Not logged in</div>;

  const studentCourseModules = await getStudentModules(session?.user.id);

  if (!studentCourseModules) {
    return <div>No Modules Found</div>;
  }

  return (
    <PageContainer title="My Marks:">
      {studentCourseModules.modules?.map((module: any) => {
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
            <div className="flex flex-col gap-2">
              <h2>Name: {module.name}</h2>
              <p>Code: {module.code}</p>
              <div className="flex justify-between text-sm mt-10 min-h-16 items-end">
                {moduleLinks.map((link, index) => (
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
    </PageContainer>
  );
};

export default Profile;
