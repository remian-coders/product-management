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

export const fetchRegisters = async function (token) {
  try {
    let response = await api.get("/client/payments", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getTicketByNumber = async function (token, ticketNo) {
  try {
    let response = await api.get(`/client/register/${ticketNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const createRegister = async function (data, token) {
  try {
    let response = await api.post("/client/register", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

export const updateCsvFile = async function (token, path) {
  try {
    let response = await api.patch(
      "/admin/csv-path",
      { path: path },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchCsvFile = async function (token) {
  try {
    let response = await api.get("/admin/csv-path", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAdminRegister = async function (token, params) {
  try {
    let response = await api.get(`/admin/payments`, {
      headers: { Authorization: `Bearer ${token}` },
      params: params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchTicketNumber = async function (token, ticketNo) {
  try {
    let response = await api.get(`/admin/register/${ticketNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchAllRegisters = async function (token, params) {
  try {
    let response = await api.get("/admin/all-payments", {
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

export const makePaymentCashier = async function (token, data) {
  try {
    let response = await api.patch("/client/payments", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const makePaymentAdmin = async function (token, data) {
  try {
    let response = await api.patch("/admin/payments", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const patchFinalizeRegister = async function (token) {
  try {
    let response = await api.patch(
      "/client-register/finalize",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getHours = async function (token) {
  try {
    let response = await api.get("/admin/working-hours", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchIssues = async function (token) {
  try {
    let response = await api.get("/admin/issues", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteIssue = async function (token, id) {
  try {
    let response = await api.delete(`/admin/issues/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const checkToken = async function (token) {
  try {
    let response = await api.get("/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchCategories = async function (token) {
  try {
    let response = await api.get("/accessory/category", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addNewCategory = async function (token, data) {
  try {
    let response = await api.post("/accessory/category", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteCategory = async function (token, id) {
  try {
    let response = await api.delete(`/accessory/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchBrands = async function (token, id) {
  try {
    let response = await api.get(`/accessory/brands/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editCategory = async function (token, id, data) {
  try {
    let response = await api.patch(`/accessory/category/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addNewAccessory = async function (token, data) {
  try {
    let response = await api.post("/accessory", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchAccessories = async function (token, id = "", brand = "") {
  try {
    let response = await api.get(`/accessory?categoryId=${id}&brand=${brand}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchAccessory = async function (token, id) {
  try {
    let response = await api.get(`/accessory/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editAccessory = async function (token, id, data) {
  try {
    let response = await api.patch(`/accessory/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteAccessory = async function (token, id) {
  try {
    let response = await api.delete(`/accessory/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const sellAccessory = async function (token, id, data) {
  try {
    let response = await api.patch(`/accessory/make-sale/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
