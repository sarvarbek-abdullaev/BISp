// export const API_URL = process.env.BACKEND_URL;
export const API_URL = 'https://bisp-production.up.railway.app';
// export const API_URL = 'http://localhost:3000';
// export const APP_URL = 'http://localhost:3001';
export const APP_URL = 'https://edu-connect-prod.vercel.app';

export const getUsers = async (type: string) => {
  try {
    const res = await fetch(`${API_URL}/${type}`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (type: string, id: string) => {
  try {
    const res = await fetch(`${API_URL}/${type}/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetailsById = async (type: string, id: string) => {
  try {
    const res = await fetch(`${API_URL}/${type}/${id}/all`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async () => {
  try {
    const res = await fetch(`${API_URL}/groups`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGroupById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/groups/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsForGroup = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/groups/${id}/available-students`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCourses = async () => {
  try {
    const res = await fetch(`${API_URL}/courses`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCourseById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getModuleById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/modules/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getModules = async () => {
  try {
    const res = await fetch(`${API_URL}/modules`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGroupsByUserId = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/groups/student/${id}`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getEnrollments = async () => {
  try {
    const res = await fetch(`${API_URL}/enrollments`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getEnrollmentsById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/enrollments/${id}`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getExams = async () => {
  try {
    const res = await fetch(`${API_URL}/exams`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getExamById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/exams/${id}`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = async () => {
  try {
    const res = await fetch(`${API_URL}/events`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStudentModules = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}/modules`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTeacherModules = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/teachers/${id}/modules`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStudentCourse = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}/course`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    // console.log(error);
  }
};

export const getStudentAttendances = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}/attendances`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStudentMarks = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/students/${id}/marks`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersByUserId = async (type: string, id: string) => {
  try {
    const res = await fetch(`${API_URL}/${type}s/${id}/orders`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getLessons = async () => {
  try {
    const res = await fetch(`${API_URL}/lessons`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserLessons = async (type: string, id: string) => {
  try {
    const res = await fetch(`${API_URL}/${type}/${id}/lessons`, {
      next: {
        revalidate: 0,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAcademicYears = async () => {
  try {
    const res = await fetch(`${API_URL}/academic-years`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAttendanceByModuleId = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/modules/${id}/attendances`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAssessMarksByModuleId = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/modules/${id}/assess`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStudentsByModuleId = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/modules/${id}/students`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
