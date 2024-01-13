'use server';
import { API_URL } from '@/utils/backend-route';
import { revalidatePath } from 'next/cache';

export const updateUserById = async (type: string, id: string | undefined, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/users/${type}s`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};
