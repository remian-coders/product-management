import api from "./api";

export const login = async function (data) {
  try {
    let response = await api.post("/admin/login", data);

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
