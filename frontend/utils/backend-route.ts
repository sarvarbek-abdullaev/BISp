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
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGroups = async () => {
  try {
    const res = await fetch(`${API_URL}/group`, {
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
    const res = await fetch(`${API_URL}/group/${id}`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCourses = async () => {
  try {
    const res = await fetch(`${API_URL}/course`, {
      next: {
        revalidate: 30,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
