import apiClient, { REQUSET_TYPES } from "./client";

export const create = async (payload) =>
  await apiClient(REQUSET_TYPES.POST, "/consultation", {
    payload,
  });

export const fetchAll = async (payload) =>
  await apiClient(REQUSET_TYPES.GET, "/consultation", {
    payload,
  });

export default {
  create,
  fetchAll,
};
