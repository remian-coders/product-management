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

export const fetchRegisters = async function () {
  try {
    let response = await api.get("/client-register");

    return response;
  } catch (error) {
    return error.response;
  }
};

export const createRegister = async function (data) {
  try {
    let response = await api.post("/client-register", data);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchEmails = async function (token) {
  try {
    let response = await api.get("/admin/email-address-config", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const createEmail = async function (token, data) {
  try {
    let response = await api.post("/admin/email-address-config", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteEmail = async function (token, id) {
  try {
    let response = await api.delete(`/admin/email-address-config/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchUsers = async function (token) {
  try {
    let response = await api.get("/admin/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const createUser = async function (token, data) {
  try {
    let response = await api.post("/admin/email-address-config", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
