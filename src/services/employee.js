import apiClient, { REQUSET_TYPES } from "./client";

const create = async (payload) =>
  await apiClient(REQUSET_TYPES.POST, "/employee", {
    payload,
  });

const fetchAll = async () => await apiClient(REQUSET_TYPES.GET, "/employee");

export default {
  create,
  fetchAll,
};
