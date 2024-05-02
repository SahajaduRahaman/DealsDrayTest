import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LogInApi = async (loginDetails) => {
  try {
    const data = await axios.post(`${BASE_URL}/admin_login`, loginDetails);
    return data;
  } catch (error) {
    return error.response;
  }
};

const AddEmployee = async (formData) => {
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      authToken: localStorage.getItem("authToken"),
    },
  };

  try {
    const data = await axios.post(
      `${BASE_URL}/add_employee`,
      formData,
      options
    );
    return data;
  } catch (error) {
    return error.response;
  }
};

const GetAllEmployee = async (filters) => {
  try {
    const data = await axios.get(`${BASE_URL}/get_employee?${filters}`);
    return data;
  } catch (error) {
    return error.response;
  }
};

const GetAdminApi = async () => {
  const options = {
    headers: {
      authToken: localStorage.getItem("authToken"),
    },
  };

  try {
    const data = await axios.post(`${BASE_URL}/get_admin`, {}, options);
    return data;
  } catch (error) {
    return error.response;
  }
};

const GetEmployeeByID = async (id) => {
  try {
    const data = await axios.get(`${BASE_URL}/get_single_employee/${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};

const UpdateEmployee = async (id, editEmployee) => {
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
      authToken: localStorage.getItem("authToken"),
    },
  };

  try {
    const data = await axios.put(
      `${BASE_URL}/edit_employee/${id}`,
      editEmployee,
      options
    );
    return data;
  } catch (error) {
    return error.response;
  }
};

const DeleteEmployee = async (id) => {
  const options = {
    headers: {
      authToken: localStorage.getItem("authToken"),
    },
  };

  try {
    const data = await axios.delete(
      `${BASE_URL}/delete_employee/${id}`,
      options
    );
    return data;
  } catch (error) {
    return error.response;
  }
};

export {
  LogInApi,
  GetAdminApi,
  AddEmployee,
  GetAllEmployee,
  GetEmployeeByID,
  UpdateEmployee,
  DeleteEmployee,
};
