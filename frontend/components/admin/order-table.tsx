'use client';

import React, { FC } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from '@/components/shared/Popover';
import CenteredText from '@/components/shared/CenteredText';
import Link from '@/components/shared/Link';
import { Button } from '@/components/ui/button';
import { createDate } from '@/lib/utils';

import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cancelOrderById, makePaidOrderById } from '@/actions/handleUpdate.action';

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
  rows: any[];
  type?: string;
}

export const OrderTable: FC<ExamTableProps> = ({ columns, rows, type }) => {
  const text = `No ${type} found`;

  if (!rows.length) return <CenteredText text={text} />;

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
        {rows.map(({ id, status, subtotal, quantity, profile, createdAt }, _id: number) => {
          const { firstName, lastName } = profile;
          return (
            <TableRow key={id}>
              <TableCell>{_id + 1}</TableCell>
              <TableCell>
                {firstName} {lastName}
              </TableCell>
              <TableCell>{subtotal}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{status}</TableCell>
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
                        <Button
                          className="w-full text-green-700 hover:text-green-700"
                          variant="ghost"
                          {...(type &&
                            id && {
                              onClick: () => makePaidOrderById(id, type),
                            })}
                        >
                          <p className="text-left w-full">Make Paid</p>
                        </Button>
                        <Button
                          className="w-full text-red-700 hover:text-red-700"
                          color="red"
                          variant="ghost"
                          {...(type &&
                            id && {
                              onClick: () => cancelOrderById(id, type),
                            })}
                        >
                          <p className="text-left w-full">Cancel</p>
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
