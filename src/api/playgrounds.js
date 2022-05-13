import axios from "axios";

async function getAllPlaygrounds(pageNumber, pageSize, signal, filter) {
  let params = `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
  if (filter) params = params + `&filter=${filter}`;
  try {
    let resBody = await axios.get(`/Playgrounds?params`);
    return resBody;
  } catch (e) {}
}

async function getPlaygroundsDropdown() {
  try {
    const resBody = await axios.get(`/Playgrounds`);
    const rows = await resBody.map((v) => ({ label: v.name, value: v._id }));
    return rows;
  } catch (e) {}
}

async function getPlaygroundById(id) {
  try {
    const resBody = await axios.get(`/Playgrounds/${id}`);
    return resBody;
  } catch (e) {}
}

async function deletePlayground(id) {
  try {
    const res = await axios.delete(`/Playgrounds/${id}`);
    return res;
  } catch (e) {}
}

async function updatePlayground(plaground) {
  console.log(plaground);
  try {
    const resBody = await axios.put(`/v2/Playgrounds`, plaground);
    return resBody;
  } catch (e) {
    console.error(e);
  }
}

async function createPlayground(playground) {
  try {
    const res = await axios.post(`/v2/Playgrounds`, playground, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (e) {}
}

async function getPlaygroundsByOwner(signal, ownerId) {
  try {
    const resBody = await axios.get(`/owners/playgrounds/`, { signal });
    return resBody;
  } catch (e) {}
}

async function getPendingPlaygrounds(id) {
  try {
    let resBody = await axios.get(`/Playgrounds`);
    let ref = 1;
    resBody = resBody.map((v) => [`${ref++}`, v.name, v.city, v.ownerName]);
    return resBody;
  } catch (e) {}
}

export {
  getAllPlaygrounds,
  getPlaygroundById,
  deletePlayground,
  updatePlayground,
  createPlayground,
  getPlaygroundsByOwner,
  getPlaygroundsDropdown,
  getPendingPlaygrounds,
};
