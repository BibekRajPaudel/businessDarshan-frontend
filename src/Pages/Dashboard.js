import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SidebarComponent/Sidebar";
import Topbar from "../Components/TopbarComponent/Topbar";
import { FaUserGraduate } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { ImAirplane } from "react-icons/im";
import { TbChecklist } from "react-icons/tb";
import { BsCalendarDay } from "react-icons/bs";
import "../CSS/University.css";
import ApplicantChart from "../Components/DashboardComponent/Charts/ApplicantChart";
import "../CSS/University.css";
import axios from "axios";
import AddPackage from "../Components/packages/addPackage";

const Dashboard = () => {
  const [employeeDetails, setEmployeeDetails] = useState();
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [leedModal, setLeadmodal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/getDetails", { headers: headers })
      .then((res) => {
        setEmployeeDetails(res.data);
      });
  }, []);

  return (
    <>
      <Topbar />
      <div className="flex gap-3">
        <Sidebar />
        {/* Main container */}
        <div
          id="maincontainer"
          className="w-full pr-5 pt-5 pb-5 h-[90vh] overflow-y-auto"
        >
          {/* Top Section */}
          <div className="w-full h-12 p-2 flex items-center justify-between">
            <div className="w-fit">
              <p className="font-poppins text-lg font-bold tracking-wide">
                <span className="text-[#2266D1] text-xl">Welcome,</span>{" "}
                {employeeDetails &&
                  employeeDetails.user &&
                  employeeDetails.user.name}{" "}
              </p>
            </div>
            {/* Add button */}
            <div className="flex items-center">
              <p
                onClick={() => setLeadmodal(true)}
                className="bg-primary-lightblue w-32 text-center hover:bg-white hover:border-[1px] hover:border-primary-lightblue hover:text-primary-lightblue cursor-pointer p-2 font-poppins text-sm rounded text-white"
              >
                Add Package
              </p>
              {leedModal && <AddPackage setLeadmodal={setLeadmodal} />}
            </div>
          </div>
          {/* Second Section */}
          <div className="w-full p-2 grid grid-cols-5 gap-5 mt-5">
            {/* Total student */}
            <div className="w-full rounded-sm p-3 flex items-center gap-5 bg-[#1298EA] shadow-sm border-[1px] relative">
              <p className="text-5xl text-white opacity-10 absolute right-7">
                <FaUserGraduate />
              </p>
              <div className="flex flex-col items-start text-white">
                <p className="font-poppins text-2xl font-bold  tracking-wide">
                  4
                </p>
                <p className="font-poppins text-sm tracking-wide">
                  Total Packages
                </p>
              </div>
            </div>
            {/* Total student */}
            <div className="w-full rounded-sm p-3 flex items-center gap-5 bg-[#6C52F3] shadow-sm border-[1px] relative">
              <p className="text-5xl text-white opacity-10 absolute right-5">
                <GiNotebook />
              </p>
              <div className="flex flex-col items-start text-white">
                <p className="font-poppins text-2xl font-bold  tracking-wide">
                  5
                </p>
                <p className="font-poppins text-sm tracking-wide">
                  Team members
                </p>
              </div>
            </div>
            {/* Total student */}
            <div className="w-full rounded-sm p-3 flex items-center gap-5 bg-[#03999F] shadow-sm border-[1px] relative">
              <p className="text-5xl text-white opacity-10 absolute right-5">
                <ImAirplane />
              </p>
              <div className="flex flex-col items-start text-white">
                <p className="font-poppins text-2xl font-bold  tracking-wide">
                  4
                </p>
                <p className="font-poppins text-sm tracking-wide">
                  Total Blogs
                </p>
              </div>
            </div>
            {/* Total student */}
            <div className="w-full rounded-sm p-3 flex items-center gap-5 bg-[#2A3948] shadow-sm border-[1px] relative">
              <p className="text-5xl text-white opacity-10 absolute right-5 rotate-6">
                <TbChecklist />
              </p>
              <div className="flex flex-col items-start text-white">
                <p className="font-poppins text-2xl font-bold  tracking-wide">
                  11
                </p>
                <p className="font-poppins text-sm tracking-wide">Bookings</p>
              </div>
            </div>
            {/* Total student */}
            <div className="w-full rounded-sm p-3 flex items-center gap-5 bg-[#F5B800] shadow-sm border-[1px] relative">
              <p className="text-5xl text-white opacity-10 absolute right-5 rotate-6">
                <BsCalendarDay />
              </p>
              <div className="flex flex-col items-start text-white">
                <p className="font-poppins text-2xl font-bold  tracking-wide">
                  5
                </p>
                <p className="font-poppins text-sm tracking-wide">Contacts</p>
              </div>
            </div>
          </div>
          {/* Third section / applicant chart */}
          <div className="w-full p-2 mt-5">
            <div className="w-full">
              <ApplicantChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
