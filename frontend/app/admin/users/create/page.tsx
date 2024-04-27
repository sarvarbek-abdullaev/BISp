import AddEditUserForm from '@/components/admin/AddEditUserForm';
import React, { FC } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';
import { getModules } from '@/actions/handleGet.action';

interface PageProps {
  searchParams: any;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const userType = searchParams['type'];
  const modules = await getModules();

  return userType ? (
    <Wrapper className="flex-1">
      <AddEditUserForm type={userType} modules={modules} />
    </Wrapper>
  ) : (
    <div>Page not found</div>
  );
};

export default Page;
