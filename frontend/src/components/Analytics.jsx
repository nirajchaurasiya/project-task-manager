import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { CgEye } from "react-icons/cg";
import "../styles/analytics.css";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { ToastContext } from "../context/ToastContext";
import { getAllAnalyticsData } from "../apis/tasks";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const setToastText = useContext(ToastContext);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const [loader, setLoader] = useState(false);
  const displayToast = (text, success) => {
    if (success) {
      setToastText(text);
      toast.success(text);
    } else {
      setToastText(text);
      toast.error(text);
    }
  };
  const useEffectExecuted = useRef();
  useEffect(() => {
    const getAnalytics = async () => {
      setLoader(true);
      const response = await getAllAnalyticsData(accessToken);

      const { msg, success, fetchedAnalyticsData } = response;
      console.log(fetchedAnalyticsData);
      if (success) {
        setAnalytics(fetchedAnalyticsData);
      }
      displayToast(msg, success);
      setLoader(false);
    };
    if (!useEffectExecuted.current) {
      getAnalytics();
      useEffectExecuted.current = true;
    }
  }, []);
  return (
    <div className="analytics-container">
      <p className="analytics-header">Analytics</p>
      {loader ? (
        <div className="loader-container-analytics">
          <Spinner />
        </div>
      ) : (
        <div className="analytics-cards">
          <div className="analytics-card">
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>Backlog Tasks</p>
              </div>
              <span>{analytics?.stateCounts?.backlog || "0"}</span>
            </div>
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>To-do Tasks</p>
              </div>
              <span>{analytics?.stateCounts?.todo || "0"}</span>
            </div>
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>In-Progress Tasks</p>
              </div>
              <span>{analytics?.stateCounts?.inprogress || "0"}</span>
            </div>
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>Completed Tasks</p>
              </div>
              <span>{analytics?.stateCounts?.done || "0"}</span>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>Low Priority</p>
              </div>
              <span>{analytics?.priorityCounts?.low || "0"}</span>
            </div>
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>High Priority</p>
              </div>
              <span>{analytics?.priorityCounts?.high || "0"}</span>
            </div>
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>Moderate Priority</p>
              </div>
              <span>{analytics?.priorityCounts?.moderate || "0"}</span>
            </div>
            <div className="analytics-card-option">
              <div className="analytics-card-option-header">
                <div className="blue-dot"></div>
                <p>Due Date Tasks</p>
              </div>
              <span>{analytics?.dueDateCounts || "0"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
