// This file contains APIs for Authentication (Login and Register)

import { axios } from "./common";
import { userCommonRoute } from "../routes/userCommonRoute";
import { accessToken } from "../utils/cookieActions";

const registerUser = async (fullName, email, password) => {
  try {
    if (!fullName || !email || !password) {
      return { success: false, msg: "All fields are mandatory" };
    }
    const response = await axios.post(`${userCommonRoute}/register`, {
      fullName,
      email,
      password,
    });

    const { success, statusCode } = response.data;

    if (success && statusCode === 200) {
      return { success: true, msg: "User registered" };
    }
  } catch (error) {
    const status = error?.response?.status || null;
    if (status === 404) {
      return { success: false, msg: "All fields are mandatory" };
    } else if (status === 400) {
      return { success: false, msg: "Email exists" };
    } else {
      return { success: false, msg: "Please try again" };
    }
  }
};

const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      return { success: false, msg: "All fields are mandatory" };
    }

    const response = await axios.post(`${userCommonRoute}/login`, {
      email,
      password,
    });

    const { success, statusCode, data } = response.data;

    if (success && statusCode === 200) {
      return { success: true, msg: "User logged In", data };
    }
  } catch (error) {
    const status = error?.response?.status;

    if (status === 400) {
      return { success: false, msg: "All fields are mandatory" };
    } else if (status === 404) {
      return { success: false, msg: "User doesn't exists" };
    } else if (status === 405) {
      return { success: false, msg: "Invalid credentials" };
    }
    return { success: false, msg: "Something went wrong" };
  }
};

const loginUserWithToken = async () => {
  try {
    if (accessToken) {
      const response = await axios.post(
        `${userCommonRoute}/login-user-with-access-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set Authorization header with access token
          },
        }
      );
      const { success, statusCode, data } = response.data;

      if (success && statusCode === 200) {
        return { success: true, msg: "User logged In", user: data };
      }
    }
  } catch (error) {
    const status = error?.response?.status;

    if (status === 400) {
      return { success: false, msg: "All fields are mandatory" };
    } else if (status === 404) {
      return { success: false, msg: "User doesn't exists" };
    } else if (status === 405) {
      return { success: false, msg: "Invalid credentials" };
    }
    return { success: false, msg: "Something went wrong" };
  }
};

export { loginUser, registerUser, loginUserWithToken };
