// This file contains APIs for User actions (Update)
import { userCommonRoute } from "../routes/userCommonRoute";
// import { accessToken } from "../utils/cookieActions";
import { axios } from "./common";
const updateProfile = async (fd, accessToken) => {
  try {
    const response = await axios.put(`${userCommonRoute}/update-profile`, fd, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data, statusCode, success } = response.data;

    if (success && statusCode === 200) {
      return { success: true, msg: "User updated", user: data?.user };
    } else {
      return { success: false, msg: "Something went wrong" };
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.status;
    // 401, 404, 400, 422
    if (status === 400) {
      return { success: false, msg: "Old password does not match" };
    } else if (status === 401) {
      return { success: false, msg: "Unauthorized request" };
    } else if (status === 404) {
      return { success: false, msg: "User couldn't be found" };
    } else if (status === 422) {
      return { success: false, msg: "New password must differ" };
    }

    return { success: false, msg: "Something went wrong" };
  }
};

const addAssignee = async (email, accessToken) => {
  try {
    const response = await axios.post(
      `${userCommonRoute}/add-assignee`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { data, statusCode, success } = response.data;
    if (success && statusCode === 200) {
      return { success: true, msg: "Assignee added", newAssignee: data };
    } else {
      return { success: false, msg: "Something went wrong" };
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.status;
    // 401, 404, 400, 422
    if (status === 400) {
      return { success: false, msg: "Email is mandatory" };
    } else if (status === 401) {
      return { success: false, msg: "Unauthorized request" };
    } else if (status === 404) {
      return { success: false, msg: "User couldn't be found" };
    } else if (status === 405) {
      return { success: false, msg: "Assignee already exists" };
    }

    return { success: false, msg: "Something went wrong" };
  }
};

export { updateProfile, addAssignee };
