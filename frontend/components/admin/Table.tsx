'use client';
import { Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { FC } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@/components/shared/Popover';
import { handleDelete } from '@/actions/handleDelete.action';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';

interface UserGroup {
  id: string;
  group: {
    id: string;
    name: string;
  };
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  year?: number;
  birthYear: number;
  createdAt: string;
  userGroup?: UserGroup[];
  course?: Course;
}

interface Group {
  id: number;
  name: string;
  year: number;
  birthYear?: number;
  email?: string;
  course: Course;
  createdAt: string;
  updatedAt: string;
  userGroups?: User[];
}

interface UsersTableProps {
  columns: string[];
  rows: User[] | Group[];
  type?: string;
}

interface Status {
  status: 'error' | 'success';
  message: string;
}

export const Table: FC<UsersTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

  let globalType = 'users';
  let revalidatePage = 'users';

  if (type === 'groups') {
    globalType = 'groups';
    revalidatePage = 'groups';
  } else if (type === 'modules') {
    globalType = 'modules';
    revalidatePage = 'programs/modules';
  } else if (type === 'courses') {
    globalType = 'courses';
    revalidatePage = 'programs/courses';
  } else {
    revalidatePage = `users/${type}`;
  }

  return (
    <TableContainer maxH="600px" overflowY="auto" position="relative">
      <ChakraTable variant="unstyled" style={{ borderCollapse: 'separate', borderSpacing: '0 1em' }}>
        <Thead position="sticky" top="0" background="#202020" zIndex="1">
          <Tr>
            {columns.map((label) => (
              <Th fontSize="14px" key={label} textTransform="none" color="white">
                {label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map(
            // @ts-ignore
            ({ id, name, email, year, birthYear, createdAt, userGroups, course, code, modules }, _id: number) => {
              return (
                <Tr
                  _hover={{
                    background: 'rgba(45, 45, 45, 0.7)',
                    color: 'white',
                  }}
                  color="#B0B0B0"
                  background="rgba(0,0, 0, 0.5)"
                  key={id}
                >
                  <Td>{_id + 1}</Td>
                  {(globalType === 'courses' || globalType === 'modules') && <Td>{code}</Td>}
                  {name && <Td>{name}</Td>}
                  {(globalType === 'groups' || globalType === 'modules') && <Td>{course && course.name}</Td>}
                  {globalType === 'groups' && <Td>{year}</Td>}
                  {globalType === 'users' && <Td>{email}</Td>}
                  {globalType === 'users' && <Td>{birthYear}</Td>}
                  {globalType === 'courses' && <Td>{modules?.length}</Td>}
                  <Td>
                    {new Date(createdAt).toLocaleDateString(navigator.language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Td>

                  {type === 'students' && (
                    // @ts-ignore
                    <Td>{userGroups.length > 0 ? userGroups[0]?.group.name : ''}</Td>
                  )}
                  {globalType === 'groups' && <Td>{userGroups ? userGroups.length : ''}</Td>}
                  <Td>
                    <Text color="white">
                      <Popover
                        element={<BsThreeDotsVertical />}
                        body={
                          <>
                            <Link href={`${type}/${id}`}>
                              <Button colorScheme="whiteAlpha" variant="ghost" width="100%">
                                <Text style={{ textAlign: 'left', width: '100%' }}>View</Text>
                              </Button>
                            </Link>
                            <Link href={`${type}/${id}/edit`}>
                              <Button colorScheme="whiteAlpha" color="green" variant="ghost" width="100%">
                                <Text style={{ textAlign: 'left', width: '100%' }}>Edit</Text>
                              </Button>
                            </Link>
                            {type === 'student' && userGroups && userGroups?.length > 0 ? (
                              ''
                            ) : (
                              <Button
                                colorScheme="whiteAlpha"
                                color="red"
                                variant="ghost"
                                width="100%"
                                {...(type &&
                                  id && {
                                    onClick: () => handleDelete(type, revalidatePage, id),
                                  })}
                              >
                                <Text style={{ textAlign: 'left', width: '100%' }}>Delete</Text>
                              </Button>
                            )}
                          </>
                        }
                      />
                    </Text>
                  </Td>
                </Tr>
              );
            },
          )}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};