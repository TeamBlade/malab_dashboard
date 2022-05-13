import axios from "axios";

async function getAllBooking(pageNumber, pageSize, filter) {
  let params = `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
  if(filter)
    params = params + `&filter=${filter}`
  try {
    const resBody = await axios.get(`/booking?${params}`);
    return resBody;
  } catch (e) {}
}

async function getBookingById(id) {
  try {
    const resBody = await axios.get(`/booking/${id}`);
    return resBody;
  } catch (e) {}
}

async function getByPlaygroundId(id) {
  try {
    const resBody = await axios.get(`/booking/${id}`);
  } catch (e) {}
}

async function createBooking(booking) {
  try {
    const resBody = await axios.post(`/booking`, booking);

    return resBody;
  } catch (e) {}
}

async function getByPlaygroundAndDate(playground, date) {
  try {
    const body = { playground, date };
    const resBody = await axios.post(
      `/owners/booking/getByPlaygroundAndDate`,
      body
    );
    return resBody;
  } catch (e) {}
}

async function acceptBooking(id) {
  try {
    const res = axios.get("/owners/booking/accept/" + id);
    return res;
  } catch (e) {}
}

async function rejectBooking(id) {
  try {
    const res = axios.get("/owners/booking/reject/" + id);
    return res;
  } catch (e) {}
}

async function getBookingByOwner(ownerId) {
  try {
    const res = axios.get("/owners/playgrounds/");
    return res;
  } catch (e) {}
}

export {
  getAllBooking,
  getBookingById,
  getBookingByOwner,
  getByPlaygroundId,
  getByPlaygroundAndDate,
  createBooking,
  acceptBooking,
  rejectBooking,
};
