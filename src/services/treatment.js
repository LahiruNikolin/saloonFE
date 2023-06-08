import apiClient, { REQUSET_TYPES } from "./client";

const create = async (payload) =>
  await apiClient(REQUSET_TYPES.POST, "/treatment", {
    payload,
  });

const fetchAll = async () => await apiClient(REQUSET_TYPES.GET, "/treatment");

export default {
  create,
  fetchAll,
};
