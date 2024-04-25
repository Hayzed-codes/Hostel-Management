import React, { useState } from "react";
import "./Attendance.css";
import { lady } from "../../assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

const Attendance = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); //  getMonth() returns a zero-based index, so we add 1 to get the actual month.

  const createCalendar = () => {
    const monthNames = [
      "January",
      " February",
      "March",
      "April",
      " May",
      "June",
      "July",
      " August",
      "September",
      "October",
      " November",
      "December",
    ];

    const daysOfWeek = [
      "Sun",
      "Mon",
      "tue",
      "Wed",
      "Thur",
      "Fri",
      "Sat",
      "Sun",
    ];

    const firstDay = new Date(year, month-1, 1).getDay();

    const numDays = new Date(year, month, 0).getDate();

    let days = []

    for (let i = 0; i < firstDay ; i++) {
        days.push("")
    }

    // Loop through each day of the month
    for (let day = 1; day <= numDays; day++) {
        // Push the day into the days array
        days.push(day) 
    }


  };
  return <div></div>;
};

export default Attendance;
