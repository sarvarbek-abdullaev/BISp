import { adminUsersTabs, columns } from '@/tabs';
import { getUsers } from '@/actions/handleGet.action';
import { FC } from 'react';
import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { Table } from '@/components/admin/Table';

interface PageProps {
  searchParams: any;
}

const UsersPage: FC<PageProps> = async ({ searchParams }) => {
  const userType = searchParams['type'];
  const userTypes = adminUsersTabs.slice(1);
  const users = await Promise.all(userTypes.map(({ name }) => getUsers(name.toLowerCase())));
  const allUsersLength = users.reduce((acc, { length }) => acc + length, 0);

  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];

  const usersData = userType && (await getUsers(userType));

  return userType ? (
    <Wrapper className="flex-1">
      <Table rows={usersData} columns={columns} type={'users/' + userType} />
    </Wrapper>
  ) : (
    <div className="flex w-full h-full flex-col gap-4">
      <Wrapper>
        <div className="flex justify-end items-center gap-4">
          {userTypes.map(({ path, name }, index) => (
            <Link key={name + path + index} href={path + '/create'}>
              <Button variant="ghost">Create {name.slice(0, name.length - 1)}</Button>
            </Link>
          ))}
        </div>
      </Wrapper>
      <Wrapper flex="1">
        <div className="flex justify-end items-center gap-4 my-4">All Users: {allUsersLength}</div>
        <div className="grid grid-cols-3 gap-4">
          {userTypes.map(({ path, name }, index) => {
            const currentLength = users[index]?.length;
            return (
              <CircularProgressBar
                key={path + name + index}
                text={currentLength}
                value={currentLength}
                maxValue={allUsersLength}
                color={colors[index]}
                path={path}
                name={name}
              />
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
};

export default UsersPage;
