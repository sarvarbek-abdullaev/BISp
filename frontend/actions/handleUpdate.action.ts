'use server';
import { API_URL } from '@/actions/handleGet.action';
import { revalidatePath } from 'next/cache';

export const changePassword = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

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
    console.log({ data });
    console.log({ _data });
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

export const updateEventById = async (id: string | undefined, validatePath: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, {
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

export const updateProductById = async (id: string | undefined, validatePath: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/e-commerce/${validatePath}`);
    revalidatePath(`/admin/e-commerce/${validatePath}/${id}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const makePaidOrderById = async (id: string | undefined, validatePath: string) => {
  try {
    const res = await fetch(`${API_URL}/orders/${id}/paid`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/e-commerce/${validatePath}`);
    revalidatePath(`/admin/e-commerce/${validatePath}/${id}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrderById = async (id: string | undefined, validatePath: string) => {
  try {
    const res = await fetch(`${API_URL}/orders/${id}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/e-commerce/${validatePath}`);
    revalidatePath(`/admin/e-commerce/${validatePath}/${id}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLessonById = async (id: string | undefined, data: any) => {
  try {
    const res = await fetch(`${API_URL}/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateAttendanceById = async (id: string | undefined, data: any) => {
  try {
    const res = await fetch(`${API_URL}/attendances/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidatePath('/attendance');
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateMarkById = async (id: string | undefined, data: any) => {
  try {
    const res = await fetch(`${API_URL}/marks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidatePath('/marks');
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateUserImageById = async (id: string | undefined, type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}/${id}/image`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidatePath('/profile');
    revalidatePath('/admin/users');
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
