import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/board.css";
import Backlog from "../ui/board/Backlog";
import Todo from "../ui/board/Todo";
import InProgress from "../ui/board/InProgress";
import Done from "../ui/board/Done";
import { useDispatch, useSelector } from "react-redux";
import { GoPeople } from "react-icons/go";
import { isValidEmail } from "../utils/emailValidation";
import { addAssignee } from "../apis/user";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { addAssigneeToRedux } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { getFormattedTasks } from "../apis/tasks";
import Spinner from "./Spinner";
import { saveFormattedTasks } from "../features/tasks/formattedTasksSlice";
export default function Board() {
  const [showPeople, setShowPeople] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const setToastText = useContext(ToastContext);
  const [loader, setLoader] = useState(false);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const emailRef = useRef(null);
  const displayToast = (text, success) => {
    setToastText(text);
    if (success) {
      toast.success(text);
    } else {
      // setToastText(text);
      toast.error(text);
    }
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleAddEmail = async () => {
    let emailError = "";
    let valid = true;
    if (!email) {
      emailError = "This field is required";
      valid = false;
    } else if (!isValidEmail(email)) {
      emailError = "Invalid email format";
      valid = false;
    }

    if (!email || !isValidEmail(email)) {
      emailRef.current.focus();
      valid = false;
    }
    setErrors({ email: emailError });
    // console.log(valid);
    if (valid) {
      const response = await addAssignee(email, accessToken);
      const { success, newAssignee, msg } = response;
      // console.log(newAssignee, msg);
      if (success) {
        dispatch(addAssigneeToRedux(newAssignee));
        displayToast(msg, success);
      } else {
        displayToast(msg, success);
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    let emailError = "";
    if (value === "") {
      emailError = "This field is required";
    } else if (!isValidEmail(value)) {
      emailError = "Invalid email format";
    }
    setErrors({ email: emailError });
  };
  useEffect(() => {
    setErrors({ email: "" });
  }, [showPeople]);

  const useEffectExecuted = useRef(false);

  useEffect(() => {
    // console.log("Effect triggered");
    // console.log("AccessToken:", accessToken);

    const getTasks = async () => {
      try {
        setLoader(true);
        const response = await getFormattedTasks(accessToken);
        const { success, formattedTasks, msg } = response;

        if (success) {
          // console.log("success", formattedTasks);
          dispatch(saveFormattedTasks(formattedTasks));
        } else {
          // console.log("error");
        }

        displayToast(msg, success);
      } catch (error) {
        // console.error("Error fetching tasks:", error);
        displayToast("Error fetching tasks", false);
      }
      // setTimeout(() => {
      setLoader(false);
      // }, 1000);
    };

    // Check if useEffect has already run
    if (!useEffectExecuted.current) {
      getTasks();
      useEffectExecuted.current = true; // Set to true after first execution
    }
  }, [accessToken]);

  return (
    <div className="board-container">
      <div className="board-header">
        <p>
          Welcome! <span>{loggedInUser?.fullName}</span>
        </p>
        <span>23 Jun, 2024</span>
      </div>
      <div className="board-second-options">
        <div className="board-add-people">
          <p>Board</p>
          <p
            onClick={() => {
              setShowPeople(!showPeople);
            }}
          >
            <GoPeople />
            <span>Add people</span>
          </p>
        </div>
        <select name="timeframe" id="timeframe">
          <option value="0">This Week</option>
          <option value="1">Today</option>
          <option value="2">This Month</option>
        </select>
      </div>
      {loader ? (
        <Spinner />
      ) : (
        <div className="board-all-cards">
          <div className="card">
            <Backlog />
          </div>
          <div className="card">
            <Todo />
          </div>
          <div className="card">
            <InProgress />
          </div>
          <div className="card">
            <Done />
          </div>
        </div>
      )}
      {showPeople && (
        <div
          className="overflow-container"
          onClick={() => {
            setShowPeople(!showPeople);
          }}
        >
          <div className="overflow-mid-container">
            {addedAlert ? (
              <div
                className="main-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="alert-notification">
                  <p>Ramgupta@gmail.com added to board</p>
                  <button
                    onClick={() => {
                      setShowPeople(false);
                      setAddedAlert(false);
                    }}
                  >
                    Okay, got it!
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="main-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p className="add-people-text">Add people to the board</p>

                <input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter the email"
                  type="text"
                  ref={emailRef}
                  className={`input-field ${
                    errors.email ? "error-border" : ""
                  }`}
                  style={
                    errors.email ? { border: "1px solid var(--error-red)" } : {}
                  }
                />
                {errors.email && (
                  <span style={{ marginTop: "-15px" }}>{errors.email}</span>
                )}
                <div className="flex-button-overflow-container">
                  <button
                    onClick={() => {
                      setShowPeople(!showPeople);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={handleAddEmail}>Add Email</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
