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

export const fetchRegisters = async function (params = null) {
  try {
    let response = await api.get("/client-register", { params: params });

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
    let response = await api.post("/admin/user", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async function (token, id) {
  try {
    let response = await api.delete(`/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
export const fetchIps = async function (token) {
  try {
    let response = await api.get("/admin/ip-address-config", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const createIp = async function (token, data) {
  try {
    let response = await api.post("/admin/ip-address-config", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteIp = async function (token, id) {
  try {
    let response = await api.delete(`/admin/ip-address-config/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updatePassword = async function (token, data) {
  try {
    let response = await api.patch("/admin/update-password", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadCsvFile = async function (token, data) {
  try {
    let response = await api.post("/admin/upload-csv-file", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateCsvFile = async function (token, data) {
  try {
    let response = await api.patch("/admin/update-csv-path", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAdminRegister = async function (token, params) {
  try {
    let response = await api.get(`/admin/register`, {
      headers: { Authorization: `Bearer ${token}` },
      params: params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const postAdminRegister = async function (token, data) {
  try {
    let response = await api.post("/admin/register", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const setWorkingHours = async function (token, data) {
  try {
    let response = await api.patch("/admin/working-hours", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const finalizeRegister = async function () {
  try {
    let response = await api.patch("/client-register/finalize");
    return response;
  } catch (error) {
    return error.response;
  }
};
