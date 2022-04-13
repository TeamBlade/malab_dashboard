import axios from "axios";

async function getOwnerById(id) {
    try {

        const resBody = await axios.get(`/Owners/${id}`)
        return resBody
    } catch (e) { }
}



export {
    getOwnerById,
}