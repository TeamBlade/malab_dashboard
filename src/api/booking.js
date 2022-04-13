import axios from "axios";


async function getAllBooking() {
    try {
        const resBody = await axios.get(`/booking`)
        return resBody;
    } catch (e) { }

}

async function getBookingById(id) {
    try {
        const resBody = await axios.get(`/booking/${id}`)
        return resBody
    } catch (e) { }
}

async function getByPlaygroundId(id) {
    try {

        const resBody = await axios.get(`/booking/${id}`)
    } catch (e) { }
}

async function createBooking(booking) {
    try {
        const resBody = await axios.post(`/booking`, booking)
        console.log(resBody)
       return resBody
    } catch (e) { }
 }

async function getByPlaygroundAndDate(playground, date) { 
    try {
        const body = {playground, date}
        const resBody = await axios.post(`/owners/booking/getByPlaygroundAndDate`, body)
       return resBody
    } catch (e) { }
}
export {
    getAllBooking,
    getBookingById,
    getByPlaygroundId,
    getByPlaygroundAndDate,
    createBooking,
}