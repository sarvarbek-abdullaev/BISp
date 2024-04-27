'use server';
import { API_URL } from '@/actions/handleGet.action';
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

export const createCourse = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createModule = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createExam = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createEnrollment = async (type: string, data: any) => {
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

export const createEvent = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath(`/admin/programs/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath(`/admin/e-commerce/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (type: string, data: any) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath(`/admin/e-commerce/${type}`);
    return _data;
  } catch (error) {
    console.log(error);
  }
};

//Student
export const createOrderByStudent = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/orders');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

// Teacher & Admin

export const createLesson = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/timetable');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const applyForCourse = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/enrollments');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const modulesRegistrations = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/modulesRegistrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/enrollments');
    revalidatePath('/dashboard');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createAttendanceClass = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/attendance-classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/attendance');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createAttendance = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/attendances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/attendance');
    return _data;
  } catch (error) {
    console.log(error);
  }
};

export const createMark = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/marks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const _data = await res.json();
    revalidatePath('/marks');
    return _data;
  } catch (error) {
    console.log(error);
  }
};
