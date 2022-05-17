import axios from "axios";

async function getAllUsers(pageNumber, pageSize, type, filter) {
  let params = `?pageSize=${pageSize}&pageNumber=${pageNumber}&type=${type}`;
  if (filter) params = params + `&filter=${filter}`;

  try {
    const resBody = await axios.get(`/v2/admin/clients${params}`);
    return resBody;
  } catch (e) {}
}

async function getPenddingUsers() {
  try {
    const res = await axios.get('/v2/admin/clients/?status="pending"');
  } catch (e) {}
}
async function addUser(user) {
  try {
    //
    const res = await axios.post(`/v2/admin/users`, user);
    return res;
  } catch (e) {
    console.error(e);
  }
}

async function updateUser(user) {
  try {
    const res = await axios.put(`/v2/admin/users`, user);
    return res;
  } catch (e) {}
}

async function deleteUser(id) {
  try {
    const res = await axios.delete(`/admin/users/${id}`);
    return res;
  } catch (e) {}
}

async function getUserCount(type) {
  try {
    const res = await axios.get(`/admin/users/count/${type}`);
    return res;
  } catch (e) {}
}

export {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getPenddingUsers,
  getUserCount,
};
