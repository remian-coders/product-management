import api from "./api";

export const login = async function (data) {
  try {
    let response = await api.post("/admin/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const forgotPassword = async function (data) {
  try {
    let response = await api.post("/admin/forgot-password", data);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const resetPassword = async function (data) {
  try {
    let response = await api.patch("/admin/reset-password", data);

    return response;
  } catch (error) {
    return error.response;
  }
};
