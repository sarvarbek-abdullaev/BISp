import { CircularProgressBar } from '@/components/admin/CircularProgressBar';
import { adminUsersTabs } from '@/tabs';
import { Wrapper } from '@/components/shared/Wrapper';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { getUsers } from '@/utils/backend-route';

const UsersPage = async () => {
  const userTypes = adminUsersTabs.slice(1);
  const users = await Promise.all(userTypes.map(({ name }) => getUsers(name.toLowerCase())));
  const allUsersLength = users.reduce((acc, { length }) => acc + length, 0);

  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];

  const buttonStyle = {
    border: '1px solid transparent',
    bg: 'blackAlpha.800',
    colorScheme: 'none',
  };

  const selectedStyle = {
    color: 'white',
    background: 'rgba(45, 45, 45, 0.7)',
    border: '1px solid black',
  };

  return (
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
