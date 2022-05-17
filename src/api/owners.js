import axios from "axios";

async function getOwnerById(id) {
  try {
    const resBody = await axios.get(`/Owners/${id}`);
    return resBody;
  } catch (e) {}
}

async function getPendingOwners() {
  try {
    let resBody = await axios.get(
      `/v2/admin/clients/?type=owner&status=pending`
    );
    let ref = 1;
    resBody = resBody.map((v) => [
      `${ref++}`,
      v.firstName + " " + v.lastName,
      v.phone,
      v.city,
    ]);
    return resBody;
  } catch (e) {}
}

export { getOwnerById, getPendingOwners };
