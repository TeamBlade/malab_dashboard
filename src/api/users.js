import axios from "axios";

async function signup(user) {
  try {
    const res = await axios.post(`/Users/signup`);
  } catch (e) {}
}

async function login(user) {
  try {
    const res = await axios.post(`/Users/login`, user);
    return res;
  } catch (e) {}
}

async function getAllUsers() {
  try {
    const resBody = await axios.get(`/Users/`);
    let ref = 1;

    const rows = await resBody.map((v) => [
      v.firstName,
      v.phone,
      v.city,
      v.email,
    ]);
    return rows;
  } catch (e) {
    console.error(e);
  }
}

async function changePassword() {}
async function resetPassword() {}
async function verify() {}
export { signup, login, getAllUsers };
