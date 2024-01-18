import { Box, Button, Flex, Grid } from '@chakra-ui/react';
import { CircularProgressBar } from '@/components/CircularProgressBar';
import { adminUsersTabs } from '@/tabs';
import { Wrapper } from '@/components/Wrapper';
import Link from '@/components/Link';

const UsersPage = () => {
  const colors = ['#00FFF5', '#FFE605', '#FF05C8'];
  const value = Math.random() * 40;

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

  const userTypes = adminUsersTabs.slice(1);

  return (
    <Flex width="100%" height="100%" flexDirection="column" gap="4">
      <Wrapper>
        <Flex justifyContent="flex-end" alignItems="center" gap="4">
          {userTypes.map(({ path, name }, index) => (
            <Link key={name + path + index} href={path + '/create'}>
              <Button {...buttonStyle} _hover={selectedStyle}>
                Create {name.slice(0, name.length - 1)}
              </Button>
            </Link>
          ))}
        </Flex>
      </Wrapper>
      <Wrapper flex="1">
        <Grid templateColumns="repeat(3, 1fr)" gap="10">
          {userTypes.map(({ path, name }, index) => (
            <CircularProgressBar
              key={path + name + index}
              text="40"
              value={value}
              maxValue={value * 2}
              color={colors[index]}
              path={path}
              name={name}
            />
          ))}
        </Grid>
      </Wrapper>
    </Flex>
  );
};

export default UsersPage;
