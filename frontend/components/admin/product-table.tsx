'use client';

import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@/components/shared/Popover';
import { handleDelete } from '@/actions/handleDelete.action';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { createDate } from '@/lib/utils';

import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  image: string;
  createdAt: string;
}

interface ExamTableProps {
  columns: string[];
  rows: Product[];
  type?: string;
}

export const ProductTable: FC<ExamTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

  let revalidatePage = `programs/${type}`;

  return (
    <TableComponent>
      <TableHeader className="sticky top-0 z-10 bg-[#202020]">
        <TableRow>
          {columns.map((label) => (
            <TableHead key={label} className="text-sm">
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ id, name, price, image, status, createdAt }, _id: number) => {
          const imageSrc = image || 'https://placehold.jp/150x150.png';
          return (
            <TableRow key={id + name}>
              <TableCell>{_id + 1}</TableCell>
              {name && <TableCell>{name}</TableCell>}
              {<TableCell>{price}</TableCell>}
              {<TableCell>{status}</TableCell>}
              {
                <TableCell>
                  <Image src={imageSrc} width={50} height={50} alt={name} />
                </TableCell>
              }
              <TableCell>{createDate(createdAt)}</TableCell>
              <TableCell>
                <div className="text-white">
                  <Popover
                    element={<BsThreeDotsVertical />}
                    body={
                      <>
                        <Link href={`${type}/${id}`}>
                          <Button className="text-white w-full" variant="ghost">
                            <p className="text-left w-full">View</p>
                          </Button>
                        </Link>
                        <Link href={`${type}/${id}/edit`}>
                          <Button className="w-full text-green-700 hover:text-green-700" variant="ghost">
                            <p className="text-left w-full">Edit</p>
                          </Button>
                        </Link>
                        <Button
                          className="w-full text-red-700 hover:text-red-700"
                          color="red"
                          variant="ghost"
                          {...(type &&
                            id && {
                              onClick: () => handleDelete(type, revalidatePage, id),
                            })}
                        >
                          <p className="text-left w-full">Delete</p>
                        </Button>
                      </>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableComponent>
  );
};
