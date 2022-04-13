import axios from "axios";
async function getAllCities() {
    try {
        const resBody = await axios.get(`/Cities`)
        return resBody;
    } catch (e) { }

}

async function getCityById(id) {
    try {

        const resBody = await axios.get(`/Cities/${id}`)
        return resBody
    } catch (e) { }


}

async function deleteCity(id) {
    try {

        const resBody = await axios.get(`/Cities/${id}`)
        return resBody
    } catch (e) { }


}

async function updateCity(id) {
    try {

        const resBody = await axios.get(`/Cities/${id}`)
        return resBody;
    } catch (e) { }


}


export {
    getAllCities,
    getCityById,
    deleteCity,
    updateCity
}