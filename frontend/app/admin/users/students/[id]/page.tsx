import React, { FC } from 'react';
import { getUserDetailsById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import Image from 'next/image';
import { createDate } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table } from '@/components/admin/Table';
import { enrollmentColumns, moduleColumns } from '@/tabs';

interface StudentPageProps {
  params: {
    id: string;
  };
}

interface StudentGroup {
  id: string;
  group: {
    id: string;
    name: string;
  };
}

interface Student {
  id: string;
  level: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    role: string;
    registeredModules: any[];
    orders: any[];
    payments: any[];
  };
  course: {
    name: string;
  };
  attendances: any[];
  enrollments: any[];
  marks: any[];
  studentGroups: StudentGroup[];
  currentGroup: StudentGroup;
}

export interface InfoRowProps {
  label: string;
  value: string | number;
}

export interface Heading {
  text: string;
}

export const InfoRow: FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex">
    <p className="flex-1">{label}:</p>
    <p className="flex-1">{value}</p>
  </div>
);

const tabs = [
  { value: 'enrollments', text: 'Enrollments' },
  { value: 'education', text: 'Course & Modules' },
  { value: 'groups', text: 'Groups' },
  { value: 'marks', text: 'Marks' },
  { value: 'orders', text: 'Orders' },
  { value: 'payments', text: 'Payments' },
];

export const Heading: FC<Heading> = ({ text }) => <h3 className="text-xl font-mono my-4">{text}</h3>;

const StudentPage: FC<StudentPageProps> = async ({ params }) => {
  const type = 'students';
  const student: Student = await getUserDetailsById(type, params.id);

  if (!student?.id) return <CenteredText text="Student not found" />;

  const { id, level, profile, course, enrollments, studentGroups, marks, currentGroup } = student;

  const enrollmentsData = enrollments.map((enrollment) => ({
    ...enrollment,
    student: {
      id,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
    },
  }));

  const registeredModulesData = profile.registeredModules.map((registeredModule) => {
    const data = {
      module: {
        course: {},
      },
    };

    const moduleData = registeredModule.module;
    data.module = {
      ...moduleData,
      course,
    };

    return data.module;
  });

  return (
    <div className="flex">
      <div className="w-full">
        <h1 className="w-full text-center text-2xl bg-[#202020] py-3 sticky top-0 border-b border-gray-500 border-dashed">
          {profile.firstName + ' ' + profile.lastName}
        </h1>
        <div className="flex justify-between p-5">
          <div className="flex flex-col max-w-lg w-full">
            <Heading text="Personal Details:" />
            <div className="flex flex-col gap-2">
              <InfoRow label="Id" value={id} />
              <InfoRow label="First Name" value={profile.firstName} />
              <InfoRow label="Last Name" value={profile.lastName} />
              <InfoRow label="Level" value={level} />
              <InfoRow label="Email" value={profile.email} />
              <InfoRow label="Birth Date" value={createDate(profile.birthDate)} />
              <InfoRow label="Role" value={profile.role} />
            </div>
          </div>
          <div className="max-w-[300px] w-full my-4">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAFElEQVR42mNkAAIAAAUAAeImBZYAAAAASUVORK5CYII="
              alt="placeholder"
              width={300}
              height={300}
              className="rounded-2xl"
            />
          </div>
        </div>
        <Tabs defaultValue="enrollments" className="w-full">
          <div className="max-w-3xl mx-auto">
            <TabsList className="w-full flex box">
              {tabs.map(({ value, text }) => (
                <TabsTrigger key={value} className="flex-1" value={value}>
                  {text}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="px-5">
            <TabsContent value="enrollments">
              <Heading text="Enrollments:" />
              {enrollments.length ? (
                <Table columns={enrollmentColumns} rows={enrollmentsData} type="/admin/enrollments" />
              ) : (
                <CenteredText>
                  <p className="text-red-600">No enrollments found</p>
                </CenteredText>
              )}
            </TabsContent>
            <TabsContent value="education">
              <Heading text="Course:" />
              {course ? (
                <InfoRow label="Name" value={course.name} />
              ) : (
                <CenteredText>
                  <p className="text-red-600">No course found</p>
                </CenteredText>
              )}

              <Heading text="Modules:" />
              {profile.registeredModules?.length ? (
                // @ts-ignore
                <Table columns={moduleColumns} rows={registeredModulesData} type="modules" />
              ) : (
                <CenteredText>
                  <p className="text-red-600">No modules found</p>
                </CenteredText>
              )}
            </TabsContent>
            <TabsContent value="groups">
              <Heading text="Groups:" />
              {studentGroups?.length > 0 ? (
                <>
                  <InfoRow label="Current Group" value={currentGroup?.group?.name || 'No Group'} />
                  <div className="mt-4">
                    <InfoRow label="All Groups" value="" />
                    <ul className="mt-4">
                      {studentGroups.map(({ group }) => (
                        <li key={group.id}>{group.name}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <CenteredText>
                  <p className="text-red-600">No groups found</p>
                </CenteredText>
              )}
            </TabsContent>
            <TabsContent value="marks">
              <Heading text="Marks:" />
              {marks?.length > 0 ? (
                <ul>
                  {marks.map((mark) => (
                    <li key={mark.id}>{mark.name}</li>
                  ))}
                </ul>
              ) : (
                <CenteredText>
                  <p className="text-red-600">No marks found</p>
                </CenteredText>
              )}
            </TabsContent>
            <TabsContent value="orders">
              <Heading text="Orders:" />
              {profile.orders.length ? (
                <ul>
                  {profile.orders.map(({ id, status, total }) => (
                    <div key={id} className="py-1">
                      <InfoRow label="Id" value={id} />
                      <InfoRow label="Status" value={status} />
                      <InfoRow label="Total" value={total} />
                    </div>
                  ))}
                </ul>
              ) : (
                <CenteredText>
                  <p className="text-red-600">No orders found</p>
                </CenteredText>
              )}
            </TabsContent>
            <TabsContent value="payments">
              <Heading text="Payments:" />
              {profile.payments.length ? (
                <ul>
                  {profile.payments.map(({ id, status, total }) => (
                    <div key={id} className="py-1">
                      <InfoRow label="Id" value={id} />
                      <InfoRow label="Status" value={status} />
                      <InfoRow label="Total" value={total} />
                    </div>
                  ))}
                </ul>
              ) : (
                <CenteredText>
                  <p className="text-red-600">No payments found</p>
                </CenteredText>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentPage;
