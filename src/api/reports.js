import axios from "axios";

async function getAllReports() {
    try {
        const resBody = await axios.get(`/Reports`)
        return resBody
    } catch (e) { }

}

async function getCashIn(id) {
    try {
        const resBody = await axios.get(`/Reports/cashIn/${id}`)
        return resBody
    } catch (e) { }


}

async function postCashIn(id) {
    try {

        const resBody = await axios.get(`/Reports/${id}`)
        return resBody
    } catch (e) { }


}

async function getCashOut(id) {
    try {
        const resBody = await axios.get(`/Reports/cashout/`)
        return resBody
    } catch (e) { }


}

async function postCashOut(id) {
    try {

        const resBody = await axios.get(`/Reports/cashout/${id}`)
        return resBody
    } catch (e) { }


}

async function putCashOut(id) {
    try {

        const resBody = await axios.get(`/Reports/cashout/${id}`)
        return resBody
    } catch (e) { }


}

async function deleteCashOut(id) {
    try {
        const resBody = await axios.get(`/Playgrounds/cashout/${id}`)
        return resBody
    } catch (e) { }


}

export {
    getAllReports,
    getCashIn,
    postCashIn,
    getCashOut,
    postCashOut,
    putCashOut,
    deleteCashOut
}