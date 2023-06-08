import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export const REQUSET_TYPES = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export default async (
  requestType,
  path,
  options = { payload: null, v2: false }
) => {
  let url = `${BASE_URL}/v1${path}`;
  if (options.v2) url = `${BASE_URL}/v2${path}`;
  try {
    const response = await axios({
      method: requestType,
      url,
      data: options.payload,
    });

    return response.data;
  } catch (e) {
    console.log("error", e);
  } finally {
  }
};
