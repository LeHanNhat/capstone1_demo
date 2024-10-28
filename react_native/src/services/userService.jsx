import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const host = 'http://10.0.2.2:8080/api/users';

export const getAllUser = async () => {
  try {
    const res = await axios.get(host);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (username, password) => {
  try {
    const res = await axios.post(host, {username, password});
    return res.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserById = async userId => {
  try {
    const res = await axios.get(`${host}/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const res = await axios.put(`${host}/${userId}`, updates);
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async userId => {
  try {
    const res = await axios.delete(`${host}/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
