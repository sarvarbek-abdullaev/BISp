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
    revalidatePath(`/admin/users/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupById = async (type: string, id: string | undefined, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}/${id}`, {
      method: 'PUT',
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

export const updateUserGroups = async (validatePath: string, backendPath: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${backendPath}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/${validatePath}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCourseById = async (id: string | undefined, validatePath: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${validatePath}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const updateModuleById = async (id: string | undefined, validatePath: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${validatePath}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const approveEnrollmentById = async (id: string | number | undefined) => {
  try {
    const res = await fetch(`${API_URL}/enrollments/${id}/approve`, {
      method: 'POST',
    });
    const _data = await res.json();
    revalidatePath('/admin/enrollments');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectEnrollmentById = async (id: string | number | undefined) => {
  try {
    const res = await fetch(`${API_URL}/enrollments/${id}/reject`, {
      method: 'POST',
    });
    const _data = await res.json();
    revalidatePath('/admin/enrollments');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExamById = async (id: string | undefined, validatePath: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/exams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${validatePath}`);
    revalidatePath(`/admin/programs/${validatePath}/${id}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};
