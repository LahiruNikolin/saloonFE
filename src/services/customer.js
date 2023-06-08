import apiClient, { REQUSET_TYPES } from "./client";
const path = "/customer";

const fetchAll = async () => await apiClient(REQUSET_TYPES.GET, path);

const search = async (payload) =>
  await apiClient(
    REQUSET_TYPES.GET,
    `${path}?search=${payload.search}&criteria=${payload.criteria}`
  );

const create = async (payload) =>
  await apiClient(REQUSET_TYPES.POST, path, {
    payload,
  });

export default {
  create,
  search,
  fetchAll,
};
