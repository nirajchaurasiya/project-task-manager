// get-formatted-tasks
// This file contains all the apis for the tasks actions

import { taskCommonRoute } from "../routes/taskCommonRoute";
import { axios } from "./common";

const createTask = async (accessToken, fd) => {
  try {
    const response = await axios.post(`${taskCommonRoute}/create`, fd, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { success, statusCode, data } = response.data;

    if (success && statusCode === 200) {
      return { success: true, msg: "Task created", task: data };
    } else {
      return { success: false, msg: "Something went wrong" };
    }
  } catch (error) {
    console.log(error);

    const status = error?.response?.status;

    if (status === 401) {
      return { success: false, msg: "Unauthorized request" };
    } else if (status === 404) {
      return { success: false, msg: "User doesn't exists" };
    } else if (status === 400) {
      return { success: false, msg: "All fields are mandatory" };
    }

    return { success: false, msg: "Something went wrong" };
  }
};

const getFormattedTasks = async (accessToken) => {
  try {
    const response = await axios.get(`${taskCommonRoute}/get-formatted-tasks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { success, statusCode, data } = response.data;
    // console.log(response.data);
    if ((success, statusCode === 200)) {
      return {
        success: true,
        msg: "Tasks retrieved",
        formattedTasks: data.formattedTasks,
      };
    } else {
      return {
        success: false,
        msg: "Something went wrong while retrieving the data",
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: "Something went wrong while retrieving the data",
    };
  }
};

const updateChecklist = async (taskUpdatedData, accessToken) => {
  try {
    const response = await axios.patch(
      `${taskCommonRoute}/update-checklist/${taskUpdatedData.taskId}`,
      { changedItems: taskUpdatedData.changedItems },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { success, statusCode, data } = response.data;

    if (success && statusCode === 200) {
      return { success: true, msg: "Task updated", task: data?.task };
    }
    return { success: false, msg: "Something went wrong" };
  } catch (error) {
    console.log(error);
    const status = error?.response?.status;

    if (status === 401) {
      return { success: false, msg: "Unauthorized request" };
    } else if (status === 400) {
      return { success: false, msg: "Task ID is mandatory" };
    } else if (status === 404) {
      return { success: false, msg: "Task doesn't exists" };
    } else if (status === 405) {
      return { success: false, msg: "Invalid request body" };
    }
    return { success: false, msg: "Something went wrong" };
  }
};

const updateTaskPhase = async (taskToUpdateWithPhase, accessToken) => {
  try {
    const response = await axios.patch(
      `${taskCommonRoute}/update-task-state/${taskToUpdateWithPhase.taskId}`,
      { state: taskToUpdateWithPhase.state },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { success, statusCode, data } = response.data;

    if (success && statusCode === 200) {
      return { success: true, msg: "Task updated", task: data?.task };
    }
    return { success: false, msg: "Something went wrong" };
  } catch (error) {
    console.log(error);
    const status = error?.response?.status;

    if (status === 401) {
      return { success: false, msg: "Unauthorized request" };
    } else if (status === 400) {
      return { success: false, msg: "Task ID is mandatory" };
    } else if (status === 404) {
      return { success: false, msg: "Task doesn't exists" };
    }
    return { success: false, msg: "Something went wrong" };
  }
};

export { getFormattedTasks, createTask, updateChecklist, updateTaskPhase };
