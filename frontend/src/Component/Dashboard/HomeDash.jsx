import React from "react";
import './HomeDash.css'

const HomeDash = () => {
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
    </div>
  );
};

export default HomeDash;
