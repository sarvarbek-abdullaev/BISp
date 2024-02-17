'use server';

import { revalidatePath } from 'next/cache';

export const handleDelete = async (type: string, revalidatePage: string, id: number | string) => {
  try {
    const res = await fetch(`http://localhost:3000/${type}/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    revalidatePath(`/admin/${revalidatePage}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
