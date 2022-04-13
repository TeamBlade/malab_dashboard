import axios from "axios";

async function getAllServices() {
    try {
        const resBody = await axios.get(`/Services`)
        let ref = 1;
        const rows = await resBody.map(v => [`${ref++}`, v.name, v.city,])
        return rows
    } catch (e) { }

}

async function getServiceById(id) {
    try {

        const resBody = await axios.get(`/Services/${id}`)
        return resBody
    } catch (e) { }


}
async function getServiceDropdown(id) {
    try {

        let resBody = await axios.get(`/Services`)
        resBody = resBody.map(x => ({label: x.name, value: x._id}))
        return resBody
    } catch (e) { }

}


async function updateService(id) {
    try {

        const resBody = await axios.get(`/Services/${id}`)
        return resBody
    } catch (e) { }


}



export {
    getAllServices,
    getServiceById,
    updateService,
    getServiceDropdown
}