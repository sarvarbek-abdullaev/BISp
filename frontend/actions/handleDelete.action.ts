'use server';

import { revalidatePath } from 'next/cache';

export const handleDelete = async (type: string, id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/${type}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    revalidatePath(`/admin/users/${type}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
