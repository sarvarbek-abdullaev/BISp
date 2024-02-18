export const API_URL = 'http://localhost:3000';

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
