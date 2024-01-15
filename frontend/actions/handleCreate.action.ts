'use server';
import { API_URL } from '@/utils/backend-route';
import { revalidatePath } from 'next/cache';

export const createUser = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/users/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};
