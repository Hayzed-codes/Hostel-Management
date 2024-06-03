import React, { useContext } from "react";
import "./HomeDash.css";
import { blacky, lady, lady2, tallest } from "../../assets";
import { Link } from "react-router-dom";

const HomeDash = () => {
  const activities = [
    {
      userPic: lady,
      userName: "Tunmise",
      action: "Tunmise has been checked out",
      time: "Now",
    },
    {
      userPic: lady2,
      userName: "Kenny",
      action: "Kenny has been checked out",
      time: "3 mins ago",
    },
    {
      userPic: blacky,
      userName: "Bode",
      action: "Bode has been checked out",
      time: "5 mins ago",
    },
    {
      userPic: tallest,
      userName: "Soliu",
      action: "Soliu has been checked out",
      time: "7 mins ago",
    },
  ];

  return (
    <div className="--flex-center _homeDashCon">
      <div className="__paraCon">
        <h1 className="__paraHeader">Welcome back, Hayzed!</h1>
      </div>

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>

        <div className="__flex __boards">
          <div className="__board">
            <p className="__boardHead">120</p>
            <p className="__boardDetails">Total Students</p>
          </div>

          <div className="__board">
            <p className="__boardHead">100</p>
            <p className="__boardDetails">Active Students</p>
          </div>

          <div className="__board">
            <p className="__boardHead">20</p>
            <p className="__boardDetails">Inactive Students</p>
          </div>

          <div className="__board">
            <p className="__boardHead">
              $20,000 <br />{" "}
            </p>
            <p className="__boardDetails">Total revenue</p>
          </div>
        </div>
      </div>

      <div className="--flex-center __firstCon">
        <h4 className="__title">Recent Activity</h4>

        {activities.map((activity, i) => (
          <div className="__users" key={i}>
            <div className="__firstUserPic">
              <img src={activity.userPic} alt="lady-picture" />
            </div>

            <div className="__userData">
              <div>
                <h5>{activity.userName}</h5>

                <p>{activity.action}</p>
              </div>

              <p>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="__lastCon">
        <h3 className="__lastTitle">Quick Actions</h3>

        <div className="__homeBtn">
          <button className="__addBtn">
            <Link to="/student-reg">Add a student</Link>
          </button>
          <button className="__attendBtn">
            <Link to="/attendance"> Attendance</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
