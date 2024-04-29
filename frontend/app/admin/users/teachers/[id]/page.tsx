import React, { FC } from 'react';
import { getUserDetailsById } from '@/actions/handleGet.action';
import CenteredText from '@/components/shared/CenteredText';
import { createDate } from '@/lib/utils';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table } from '@/components/admin/Table';
import { moduleColumns } from '@/tabs';
import { Heading, InfoRow } from '@/app/admin/users/students/[id]/page';

interface PageProps {
  params: {
    id: string;
  };
}

interface Teacher {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    imageUrl: string;
    role: string;
    orders: any[];
    payments: any[];
  };
  modules: {
    id: string;
    name: string;
  }[];
}

const tabs = [
  { value: 'education', text: 'Modules' },
  { value: 'orders', text: 'Orders' },
  { value: 'payments', text: 'Payments' },
];

const TeaacherPage: FC<PageProps> = async ({ params }) => {
  const type = 'teachers';
  const teacher: Teacher = await getUserDetailsById(type, params.id);

  console.log(teacher);

  if (!teacher?.id) return <CenteredText text="Teacher not found" />;

  const { id, profile, modules } = teacher;

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
              <InfoRow label="Email" value={profile.email} />
              <InfoRow label="Birth Date" value={createDate(profile.birthDate)} />
              <InfoRow label="Role" value={profile.role} />
            </div>
          </div>
          <div className="max-w-[300px] w-full my-4">
            <Image src={profile.imageUrl} alt="placeholder" width={300} height={300} className="rounded-2xl" />
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
            <TabsContent value="education">
              <Heading text="Modules:" />
              {modules?.length ? (
                // @ts-ignore
                <Table columns={moduleColumns} rows={modules} type="modules" />
              ) : (
                <CenteredText>
                  <p className="text-red-600">No modules found</p>
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

export default TeaacherPage;
