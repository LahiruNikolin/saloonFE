import apiClient, { REQUSET_TYPES } from "./client";

const create = async (payload) =>
  await apiClient(REQUSET_TYPES.POST, "/appointment", {
    payload,
  });
const fetchAll = async () =>
  await apiClient(REQUSET_TYPES.GET, "/appointment/2021-02-23");

const fetchByDate = async (date) =>
  await apiClient(REQUSET_TYPES.GET, `/appointment/${date}`);

const updateJobStatus = async (payload) =>
  await apiClient(REQUSET_TYPES.PATCH, `/appointment/`, { payload });

export default {
  create,
  fetchAll,
  fetchByDate,
  updateJobStatus,
};
